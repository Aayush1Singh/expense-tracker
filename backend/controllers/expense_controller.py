from models.User import User
from models.Group import Group
from models.Expenses import Expense
def add_expense(
  user_id,
  amount: int,
  description: str,
  split_type,
  split: list,
  group_id=None,
):
  """
  Adds a new expense for a user.

  Args:
    user_id (int): ID of the user who paid.
    amount (int): Expense amount.
    description (str): Description of the expense.
    split_type: Enum value for split type.
    split (list): List of split amounts or percentages.
    group_id (int, optional): ID of the group.
    isPaid (list, optional): List of booleans indicating payment status.
    date (str, optional): Date of the expense in 'YYYY-MM-DD' format.

  Returns:
    dict: The created expense record.
  """

  print(user_id)
  paid_by = User.objects.get(username=user_id)
  group = Group.objects.get(id=group_id) if group_id else None
  isPaid=[]
  print(split)
  split = [x[1] for x in split]
  print(split)
  for member in group.members if group else []:
    if member.username == user_id:
      isPaid.append(True)
    else:
      isPaid.append(False)

  expense = Expense(
    description=description,
    amount=amount,
    paid_by=paid_by,
    split_type=split_type,
    split=split,
    group=group,
    isPaid=isPaid if isPaid is not None else [False] * len(split)
  )
  expense.save()

  # Add the expense to the group's expenses list if group exists
  if group:
    group.expenses.append(expense)
    group.save()

  return {
    "id": str(expense.id),
    "description": expense.description,
    "amount": expense.amount,
    "paid_by": str(expense.paid_by.id),
    "split_type": str(expense.split_type),
    "split": expense.split,
    "group": str(expense.group.id) if expense.group else None,
    "isPaid": expense.isPaid,
  }