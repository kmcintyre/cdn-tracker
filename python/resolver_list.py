import json
from pymongo import MongoClient
uri = "mongodb://localhost:27017"
client = MongoClient(uri)

database = client["cdntracker"]
collection = database["resolvers"]
cursor = collection.find()
resolvesTo = set([])
for c in cursor:
    resolvesTo.add(c['resolvesTo'])

domains = []
for d in list(resolvesTo):
    domains.append({'domain': d})

filename = "data.json"
with open(filename, 'w') as file:
    json.dump(domains, file, indent=4)