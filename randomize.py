#
# randomize.py
#

from __future__ import print_function

import json
import random


with open('participants.json') as f:
  participants = json.load(f)

print(participants)
participantsFlat = sum(participants.values(), [])
print(participantsFlat)
participantsFlatSet = set(participantsFlat)


def inSameFamily(name1, name2):
    for family in participants:
        if name1 in participants[family] and name2 in participants[family]:
            return True
    return False


def testInSameFamily(x, y):
    print(x, y, inSameFamily(x,y))


dummyAssignment = {
    "A1": "B1",
    "A2": "B2",
    "A3": "B3",
    "B1": "A1",
    "B2": "A2",
    "B3": "A3",
    "B4": "C1",
    "C1": "D1",
    "C2": "B4",
    "D1": "C2"
};


def validateAssignment(assignment):

    if set(assignment.keys()) != participantsFlatSet:
        print("[validateAssignment] Bad keys.")
        print("participants:", participantsFlat)
        print("keys:", assignment.keys())
        return False

    if set(assignment.values()) != participantsFlatSet:
        print("[validateAssignment] Bad values.")
        print("participants:", participantsFlat)
        print("values:", assignment.values())
        return False

    for name in assignment:
        if inSameFamily(name, assignment[name]):
            print("[validateAssignment] " + name + " and " + assignment[name] + 
                    " in same family.")
            return False

    return True


#print("dummyAssignment: ", dummyAssignment, validateAssignment(dummyAssignment))


def randomAssignment():
    for i in range(100):
        targets = list(participantsFlat)
        random.shuffle(targets)
        assignment = {x:y for x, y in zip(participantsFlat, targets)}
        valid = validateAssignment(assignment)
        print(i, valid, assignment)
        if valid:
            return assignment
    return None


result = randomAssignment()
print("\nrandom assignment:\n", result)

with open('assignment.json', 'w') as out:
        json.dump(result, out)


