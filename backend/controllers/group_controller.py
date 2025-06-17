from models.User import User 
from models.Group import Group# Adjust import paths as needed
from bson import ObjectId
from mongoengine import DoesNotExist
def add_group(names, ids):
  # Create user references from ids
  members = [User.objects.get(id=user_id) for user_id in ids]
  group = Group(name=names, members=members)
  group.save()
  return group

def group_details(group_id):
  print(group_id)
  try:
    group = Group.objects.get(id=group_id)
    print(group)
  except DoesNotExist:
    print('not found')
        # No group found with that id
    return None
  except Exception as e:
    print(e)
    return None
  group_info = {
    "id": str(group.id),
    "name": group.name,
    "members": [{"id": str(member.id), "name": member.name} for member in group.members],
    "expenses": [
      {
        "id": str(expense.id),
        "description": expense.description,
        "amount": expense.amount,
        "paid_by": {"id": str(expense.paid_by.id), "name": expense.paid_by.name},
        "split":expense.split,
        "isPaid":expense.isPaid,
        "date": expense.date.isoformat() if hasattr(expense, "date") else None
      }
      for expense in getattr(group, "expenses", [])
    ]
  }
  return group_info