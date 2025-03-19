from urllib.parse import urlparse
import csv
from curl_cffi import requests

from pymongo import MongoClient
uri = "mongodb://localhost:27017"
client = MongoClient(uri)

database = client["cdntracker"]
collection = database["resolvers"]

CSV_URL = 'https://downloads.majestic.com/majestic_million.csv'

download = requests.get(CSV_URL, impersonate="chrome")
decoded_content = download.content.decode('utf-8')
cr = csv.reader(decoded_content.splitlines(), delimiter=',')
my_list = list(cr)
for row in my_list[1:]:
    domain = row[2]
    resolver = collection.find_one({'domain': domain})
    if resolver is None:
        try:
            response = requests.get(domain, impersonate="chrome")
            print(domain + ' ' + response.url)
            parsed_url = urlparse(response.url)
            io = { 'domain': domain, 'resolvesTo': parsed_url.hostname }
            collection.insert_one(io)                       
        except:
            print('')
            print('error: ' + domain)
            print('')