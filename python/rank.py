import csv
from curl_cffi import requests

from pymongo import MongoClient
uri = "mongodb://localhost:27017"
client = MongoClient(uri)

database = client["cdntracker"]
resolvers_collection = database["resolvers"]
rank_collection = database["ranks"]

CSV_URL = 'https://downloads.majestic.com/majestic_million.csv'

download = requests.get(CSV_URL, impersonate="chrome")
decoded_content = download.content.decode('utf-8')
cr = csv.reader(decoded_content.splitlines(), delimiter=',')
my_list = list(cr)
index = 1
for row in my_list[1:]:
    domain = row[2]    
    resolver = resolvers_collection.find_one({'domain': domain})
    if resolver is not None:
       resolvesTo = resolver['resolvesTo']
       rank = rank_collection.find_one({'site': resolvesTo})
       if rank is None:
           rank_obj = { 'site': resolvesTo, 'rank': index }
           rank_collection.insert_one(rank_obj)
           index += 1