from langchain.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAI
import os
import uuid
import re
from dotenv import load_dotenv
from pymongo import MongoClient
from models.User import User
from models.Expenses import Expense,SplitType
from models.Group import Group
from mongoengine.errors import InvalidQueryError
load_dotenv()
mongo_url = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client=MongoClient(mongo_url)
db=client['test']

prompt=PromptTemplate(template= """You are a senior Python developer and MongoEngine expert(Note that MongoDB can not perform joins).  

Given an English-language request about the Expense, Group, or User collections produce
- If the query can be done in a single `QuerySet` expression, return a single line.
- If MongoDB joins would be needed (e.g., `group__members__username`), return a **minimal multi-step Python code** using valid MongoEngine queries.
- Do not include any print statements, explanations, or imports.
- Do **not** write any imports, explanations, or print statements—only the query expression itself.
-Return only the raw Python code—no markdown fences (```````), no inline backticks (``), no syntax highlighting hints (python, lang-py, etc.), and no comments.
The username of the user who is requesting query is {username}
Summary of chat till now is {summary}
Here are your model definitions and field descriptions:
-Wrap the logic into a function called `answer()` and return the final result from it. Do not include any print statements or explanations. Only return the function definition.
Models:
  
class User(Document):
    name         : StringField
    username     : StringField
    groups       : ListField(ReferenceField("Group"), default=[])

class Group(Document):
    name         : StringField
    members      : ListField(ReferenceField("User"))
    expenses     : ListField(ReferenceField("Expense"))

class Expense(Document):
    description  : StringField (required)
    amount       : IntField (required, min_value=0)
    paid_by      : ReferenceField("User", required)
    split_type   : EnumField(SplitType {{EQUAL, PERCENTAGE}}, required)
    split        : ListField(IntField, required)
    group        : ReferenceField("Group")
    isPaid       : ListField(BooleanField, required)
    created_at   : DateTimeField(default=datetime.utcnow)


Allowed operators and lookups include:
  - Equality: `field=value`
  - Greater/Less Than: `field__gt=value`, `field__lt=value`
  - Contains / Startswith: `field__contains="foo"`, `field__startswith="A"`
  - In list: `field__in=[...]`
  - Boolean list membership: `isPaid__all=[True]`, `isPaid__contains=False`
  - Reference comparisons by id: `paid_by=<User instance or id>`
  - Enum comparisons: `split_type=SplitType.EQUAL`
  - Nested list queries: `split__size=3`, `split__contains=50`

Examples:

NL: “List all users with username 'jdoe'”  
answer:
def answer():
  return User.objects(username="jdoe")

NL: “Find expenses over 100 rupees”  
answer:
def answer():
    return Expense.objects(amount__gt=100)

NL: “Show me expenses in group 'TripJune'”  
answer:
def answer():
    return Expense.objects(group__name="TripJune")
Now generate the single-line MongoEngine query for this input(delimited by @@@):
@@@{query}@@@
""" ,input_variables=['query','username','summary'])

prompt_summary=PromptTemplate(template="""You are a mongoDB expert. For the given summary(delimited by ###) and a given new query(delimited by @@@) and its response(delimited by $$$, it is a mongoengine query), generate a new summary
Summary:
@@@{summary}@@@
query:
###{query}###
response:
$$${response}$$$""",input_variables=['summary','query','response'])
prompt_title=PromptTemplate(template="""Given a user query(delimited by @) generate a small title for the chat.
Enssure to just give the title and **not** give any meta commentary
@{query}@""",input_variables=['query'])
chat_llm=GoogleGenerativeAI(
  model="gemini-2.5-flash-preview-05-20",
  google_api_key=os.getenv('GEMINI_KEY'),
  temperature=1,
)
summary_llm=GoogleGenerativeAI(
  model="gemini-1.5-flash-8b",
  google_api_key=os.getenv('GEMINI_KEY'),
  temperature=1,
)
title_llm=GoogleGenerativeAI(
  model="gemini-2.0-flash",
  google_api_key=os.getenv('GEMINI_KEY'),
  temperature=1,
)
def generate_session_id(user_id):
  return f"{uuid.uuid4()}"

def push_session(user_id,session_id):
  obj={
   "summary":'',
   "chat_history":[],
   'creator':user_id,
   'session_id':session_id,
  }
  sessions=db['Sessions']
  sessions.insert_one(obj)
  users=db['user']
  users.update_one({'username':user_id},{
    '$push':{
      "all_sessions":{
        "session_id":session_id,
        "title":'New Chat',
      }
    }
  })
def create_session(user_id):
  session_id=generate_session_id(user_id)
  push_session(user_id,session_id)
  return session_id

def get_summary(session_id,user_id):
  sessions=db['Sessions']
  chat_info=sessions.find_one({'session_id':session_id,'creator':user_id})
  summary=chat_info['summary']
  return summary
def new_summary_generator(current_summary,new_chat):
  chain = prompt_summary | summary_llm
  output = chain.invoke({'response':new_chat['response'],'query':new_chat['query'],"summary":current_summary})
  # print(output.content)
  return output
async def generate_title(chat):
  
  chain= prompt_title | summary_llm
  title= await chain.ainvoke({'query':chat['query'],'response':chat['response']})
  return title
async def write_chat_to_history(session_id,current_summary,new_chat,user_id):
  sessions=db['Sessions']
  users=db['user']
  new_summary=new_summary_generator(current_summary,new_chat)
  if(current_summary==""):
    title=await generate_title(new_chat)
    users.update_one({'username':user_id,'all_sessions.session_id':session_id}, {'$set': {'all_sessions.$.title': title}})
    print("title set")
  sessions.update_one({
    "session_id" : session_id
    }, {
    "$push": {
      "chat_history": new_chat
    },
    "$set":{
      "summary":new_summary,
      'new_upload':False
    }
  })
def get_all_sessions(user_id):
  users=db['user']
  user_details=users.find_one({'username':user_id})
  print(user_details)
  all_sessions=user_details['all_sessions']
  return all_sessions

async def query_resolve(query,username,session_id):
  summary=get_summary(session_id,username)
  chain = prompt | chat_llm
  output = await chain.ainvoke({'query':query,"summary":summary,'username':username})
  print(output)
  new_chat={
    'query':query,"response":output
  }
  return output,summary,new_chat
ALLOWED_PATTERN = re.compile(
    r"^[\s\w,\[\]\(\)'\"=\.>_<\-\+]+$"  # allow most Python chars we need
)
# Only allow the minimal characters we need, no imports, no semicolons, no __dunders__
_allowed = re.compile(r'^[\w\s\.\[\]\(\)\{\}=,"><_+\-]+$')
_forbidden = re.compile(r'\b(import|from|__|;)\b')
def exec_block_and_get_result(code_str: str):
  
    # 1) Indent every line of the block so it can live inside a function
    indented = "\n".join("    " + ln for ln in code_str.splitlines())
    
    # 2) Build a temporary function
    wrapper = f"""
def __user_block__():
{indented}
"""
    # 3) Prepare sandbox namespace
    ns = {
        "User": User,
        "Group": Group,
        "Expense": Expense,
        "SplitType": SplitType,
    }
    
    # 4) exec the function definition
    exec(wrapper, ns)
    
    # 5) call the function and return its result
    return ns["__user_block__"]()
def safe_execute_block(code_str: str):
  ns = {
      "User": User,
      "Group": Group,
      "Expense": Expense,
      "SplitType": SplitType,
  }
  exec(code_str, ns)
  return ns["answer"]()
      
      
      
      
      
      
FORMAT_PROMPT = PromptTemplate(
    input_variables=["user_query", "mongo_query", "results"],
    template="""
You are a helpful assistant for an expense tracking app. Your job is to return the result of a MongoEngine query in a **Markdown-formatted** response.

Inputs:
- User query: "{user_query}"
- MongoEngine query: `{mongo_query}`
- Query result: {results}

Guidelines:
- Start with a **bold summary** of what the user asked.
- Interpret the result intelligently — it can be a number, a single document, or a list of documents.
- Format the output in a way that is helpful and clear to the user.
- Prefer concise, readable Markdown.
- If the result is empty or None, show:
  > ⚠️ **No matching records found.**

You are free to choose the Markdown formatting that best represents the result. Do **not** include raw code, JSON, or explanation outside the Markdown output.
"""
)  
def format_results(user_query: str, mongo_query: str, queryset) -> str:
    # Case 1: If result is a QuerySet or list of documents
    if hasattr(queryset, "__iter__") and hasattr(queryset, "first"):
        docs = [doc.to_mongo().to_dict() for doc in queryset[:5]]
        for d in docs:
            payer = d.get("paid_by")
            if hasattr(payer, "name"):  # if it's a DBRef or Document
                d["paid_by"] = payer.name
            d["status"] = "Paid" if all(d.get("isPaid", [])) else "Unpaid"

        results_input = docs

    # Case 2: If result is a single document
    elif hasattr(queryset, "to_mongo") and callable(queryset.to_mongo):
        d = queryset.to_mongo().to_dict()
        payer = d.get("paid_by")
        if hasattr(payer, "name"):
            d["paid_by"] = payer.name
        d["status"] = "Paid" if all(d.get("isPaid", [])) else "Unpaid"
        results_input = [d]

    # Case 3: Any other primitive type (int, str, float, bool, dict, etc.)
    else:
        results_input = queryset

    # Format with LLM
    result_text = (FORMAT_PROMPT | chat_llm).invoke({
        "user_query": user_query,
        "mongo_query": mongo_query,
        "results": results_input,
    })

    return result_text.strip()

async def chat(query, session_id, username):
    q_str,summary,new_chat =await query_resolve(query, username, session_id)
    print(q_str)
    qs = safe_execute_block(q_str)
    print(qs,type(qs))
    pretty = format_results(query, q_str, qs)
    new_chat['response']=pretty
    await write_chat_to_history(session_id,summary,new_chat,username)
    return pretty
  
def get_session(session_id,creator):
  sessions=db['Sessions']
  chat_info=sessions.find_one({'session_id':session_id,"creator":creator})
  print(session_id,creator,chat_info)
  summary,chat_history=chat_info['summary'],chat_info['chat_history']
  
  return summary,chat_history
