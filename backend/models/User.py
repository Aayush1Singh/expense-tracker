from mongoengine import Document, StringField, ReferenceField,ListField, EmbeddedDocument, EmbeddedDocumentField
# from models.Group import Group
class SessionInfo(EmbeddedDocument):
    session_id = StringField(required=True)
    title = StringField()
class User(Document):
    name=StringField()
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    username=StringField()
    groups = ListField(ReferenceField("Group"), default=[])
    all_sessions = ListField(EmbeddedDocumentField(SessionInfo))