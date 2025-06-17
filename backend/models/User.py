from mongoengine import Document, StringField, ReferenceField,ListField
# from models.Group import Group
class User(Document):
    name=StringField()
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    username=StringField()
    groups = ListField(ReferenceField("Group"), default=[])
    
    

  
