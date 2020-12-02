#
# write_files.py
#


from __future__ import print_function

import json
import random


with open('participants.json') as f:
  participants = json.load(f)


with open('assignment.json') as f:
  assignment = json.load(f)


for family in participants:
    with open("assignment_" + family + ".txt", 'w') as f:
        for member in participants[family]:
            print(member + " -> " + assignment[member], file=f)


