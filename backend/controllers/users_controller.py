from models.User import User
from models.Group import Group
from models.Expenses import Expense
def create_user(name,username):
  if len(User.objects(username=username)) > 0:
    return {'status': 'failed'}
  new_user=User(name=name,username=username)
  new_user.save()
from bson import ObjectId
def get_balances(username):
  #username
  user = User.objects(username=username).first()
  print('hello')
  if not user:
    print('ehll')
    return []
  group_ids = [g.id for g in user.groups]
  print(group_ids)
  groups = Group.objects(id__in=group_ids)
  print(groups)
  # groups = Group.objects(id__in=user.groups)
  balances=[]
  
  for group in list(groups):
      expense_ids = [str(g.id) for g in group.expenses]
      print(expense_ids)
      expenses = Expense.objects(id__in=expense_ids)
      print(expenses)
      # expenses=Expense.objects(id__in=group.expenses)
      user_index=[str(member.id) for member in group.members].index(str(user.id))
      
      print(user_index)
      for expense in expenses:
        totalPercentPaid=0
        for i in range(len(expense.isPaid)):
          if expense.isPaid[i]==True:
            totalPercentPaid+=expense.split[i]
        amount_to_be_paid = 0
        print('momo')
        if expense.paid_by == user:
            amount_to_be_paid = -(((expense.amount)*(100-totalPercentPaid))/100)
            print('yelo')
        else:
          print('ioio')
          # Find the user's index in the group's members list
          try:
            amount_to_be_paid = expense.split[user_index]
            print('pop')
            if(expense.isPaid[user_index]):
              amount_to_be_paid=0
              
          except ValueError:
            print('ko')
            amount_to_be_paid = 0
        # Do something if the user paid the expense
        # print({'amount_to_be_paid': amount_to_be_paid,"expense_id":expense.id,"description":group.description})
        balances.append({'amount_to_be_paid': amount_to_be_paid,"expense_id":str(expense.id),"description":expense.description,'name':group.name})
  return balances
def pay(expense_id, user_id):
  print(expense_id)
  expense = Expense.objects(id=ObjectId((expense_id))).first()
  print(expense)
  if not expense:
    return
  group = expense.group
  if not group:
    return
  try:
    user_index = [str(member.username) for member in group.members].index(str(user_id))
    print(user_index)
    expense.isPaid[user_index] = True
    expense.save()
  except ValueError:
    print('error')
    pass
  return  


def checkUser(username):
  if(len(User.objects(username=username))>0):
    return True
  else:
    return False
  
def getAllGroups(username):
  user = User.objects(username=username).first()
  if not user:
    return []
  group_ids = [group.id  for group in user.groups]
  groups_brief = Group.objects(id__in=group_ids)
  result = []
  for g in groups_brief:
      result.append({
          "id": str(g.id),                        
          "name": g.name,         
          "members": [m.username for m in g.members],   
          "expenses": [str(e.id) for e in g.expenses] 
      })

  return result