from fastapi import FastAPI,Query,Body
from fastapi import Request
from controllers.group_controller import *
from controllers.expense_controller import *
from controllers.users_controller import *
from models.User import User
from models.Group import Group
from models.Expenses import Expense
from fastapi.middleware.cors import CORSMiddleware
from db.database import *
from controllers.chat_controller import *
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
  return {"message": "Hello World"}
@app.post('/groups')
async def create_new_group(request: Request,item= Body()):
  data = await request.json()
  name = data.get("name")
  member_usernames = data.get("members", [])

  print(data)
  # Fetch User objects by username
  members = list(User.objects(username__in=member_usernames))
  myDict={};
  for i in members:
    myDict[i.username]=1;
  username_not_present=[]
  for i in member_usernames:
    if(i not in myDict):
      username_not_present.append(i)
  print(myDict,username_not_present)
  if(len(username_not_present)>0): 
    return {'status':'failed','members':username_not_present}
  # Create the group
  group = Group(name=name, members=members, expenses=[])
  group.save()

  # Add this group to each user's groups list
  for user in members:
    user.groups.append(group)
    user.save()

  return {
    'status':'success',
    "id": str(group.id),
    "name": group.name,
    "members": [user.username for user in members]
  }
@app.get('/groups/{group_id}')
def get_group_details(group_id):
  try:
    res=group_details(group_id)
    return {'status':'success','response':res}
  except Exception as e:
    return {'status':'failed'}
  
@app.post('/groups/{group_id}/expenses')
async def add_new_expense(request: Request, group_id,item= Body()):
  try:
    data = await request.json()
    print(data)
    user_id = data.get("user_id")
    amount = data.get("amount")
    description = data.get("description")
    split_type = data.get("split_type")
    split = data.get("split", [])
    # Call the add_expense function
    expense_record = add_expense(
      user_id=user_id,
      amount=amount,
      description=description,
      split_type=split_type,
      split=split,
      group_id=group_id,
    )
    return {'status':'success','response':expense_record}
  except Exception as e:
    return {'status':'failed'}
    
@app.get('/groups/{group_id}/balances')
async def func(request:Request,group_id):
  try:
    res=group_details(group_id)
    if(res is None):
      return {'status':'failed'}
    else:
      return {'status':'failed',"response":res}
  except Exception as e:
      return {'status':'failed'}

@app.get('/users/{user_id}/balances')
async def func2(request:Request,user_id):
  try:
    res=get_balances(user_id)
    return {'status':'success','response':res}
  except Exception as e:
    return {'status':'failed'}
  
@app.post('/login')
async def login(request:Request,item= Body()):
  data = await request.json()
  username=data.get('username')
  print(username)
  if(checkUser(username)):
    return {'status':'success'}
  else:
    return {"status":'failed'}
@app.post('/signup')
async def signup(request:Request,item= Body()):
  data = await request.json()
  username=data.get('username')
  name=data.get('name')
  if(checkUser(username)):
    return {"status":'failed'}
  else:    
    create_user(name,username)
    return {'status':'success'}
@app.get('/users/{user_id}/groups')
async def get_all_groups(request:Request,user_id):
  try:
    answer=getAllGroups(user_id)
    return {'status':'success','response':answer}
  except Exception as e:
    return {'status':'failed'}
  
@app.post('/users/payBack')
async def payBack(request:Request,item= Body()):
  try:
    body =await request.json()
    username=body.get('username')
    expense_id=body.get('id')
    print(body)
    pay(expense_id,username)
    return {'status':'success'}
  except Exception as e:
    return {'status':'failed'}


@app.post('/users/{user_id}/create_session')
async def create_seesio(user_id):
  try:
    res=create_session(user_id)
    print(user_id)
    return {'status':'success',"response":res}
  except Exception as e:
    return {'status':'failed'}

@app.get('/users/{user_id}/query/{session_id}')
async def resolve(session_id,user_id,query= Query(None)):
  try:
    print(query,session_id,user_id)
    res=await chat(query,session_id,user_id)
    return {'status':'success','response':res}
  except Exception as e:
    return {'status':'failed'}

@app.get('/users/{user_id}/load_all_chat')
async def func10(user_id):
  try:
    res= get_all_sessions(user_id)
    return {'status':'success',"response":res}
  except Exception as e:
    return {'status':'failed'}

@app.get('/users/{user_id}/load_chat/{session_id}')
async def func11(user_id,session_id):
  try:
    res=get_session(session_id,user_id)
    return {'status':'success','response':res}
  except Exception as e:
    return {'status':'failed'}
