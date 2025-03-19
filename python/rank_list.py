from pymongo import MongoClient, DESCENDING
uri = "mongodb://localhost:27017"
client = MongoClient(uri)

database = client["cdntracker"]
collection = database["ranks"]
cursor = collection.find().sort('rank', DESCENDING)
for c in cursor:
    print(str(c['rank']) + ' ' + c['site'])