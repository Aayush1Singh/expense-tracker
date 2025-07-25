from mongoengine import Document, StringField, IntField, ReferenceField, ListField, EnumField,BooleanField
from enum import Enum
from mongoengine import DateTimeField
from datetime import datetime
class SplitType(Enum):
  EQUAL = "equal"
  PERCENTAGE = "percentage"

class Expense(Document):
  description = StringField(required=True)
  amount = IntField(required=True, min_value=0)
  paid_by = ReferenceField("User", required=True)
  split_type = EnumField(SplitType, required=True)
  split = ListField(IntField(), required=True)
  group = ReferenceField("Group")
  isPaid = ListField(field=BooleanField(), required=True)
  created_at = DateTimeField(default=datetime.utcnow)
  