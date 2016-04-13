#!/usr/bin/python
"""Converts CSV to JSON."""

import fileinput
import json

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
        out.append(dct)

print(json.dumps(out))
