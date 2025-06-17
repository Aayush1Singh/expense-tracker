from models.User import User
from mongoengine import Document, StringField, ListField, ReferenceField
# from models.Expenses import Expense

class Group(Document):
    members = ListField(ReferenceField("User"))
    name = StringField()
    expenses = ListField(ReferenceField("Expense"))