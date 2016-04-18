#!/usr/bin/python
"""Converts CSV to JSON."""

import fileinput
from pymongo import MongoClient
import os


client = None
try:
    mongohost = os.environ['MONGO_PORT_27017_TCP_ADDR']
    client = MongoClient(host=mongohost)
    print("HURRAY!")
except KeyError:
    client = MongoClient()


db = client.beverland
db.users.drop()
db.letters.drop()
db.keywords.drop()

db.users.insert_one({"name": "researcher1", "password": "123"})
db.users.insert_one({"name": "researcher2", "password": "123"})

firstL = False
fields = []
out = []
for line in fileinput.input(openhook=fileinput.hook_encoded("utf-8")):
    if not firstL:
        fields = line.split(";")
        firstL = True
    else:
        dct = {}
        row = line.split(";")
        for i in range(len(fields)):
            field = fields[i].strip()
            cell = row[i].strip()
            dct[field] = cell
        dct["userKeywords"] = []
        print(dct)
        db.letters.insert_one(dct)

print("done")
