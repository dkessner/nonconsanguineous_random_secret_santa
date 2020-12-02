//
// randomize.js
//



const fs = require('fs')

/*
const participants = JSON.parse(fs.readFileSync("participants.json"))
console.log(participants);
*/

const participants = require("./participants.json");


let participantsFlat = [];
for (family in participants)
    participantsFlat = participantsFlat.concat(participants[family]);
let participantsFlatSet = new Set(participantsFlat);


function inSameFamily(name1, name2)
{
    for (family in participants)
        if (participants[family].includes(name1) && participants[family].includes(name2))
            return true;        
    return false;
}


let testInSameFamily = (x, y) => console.log(x, y, inSameFamily(x, y));


function validateAssignment(assignment)
{
    let keys = new Set(Object.keys(assignment));
    let values = new Set(Object.values(assignment));

    /*
    console.log("keys:", keys);
    console.log("values:", values);
    console.log("participantsFlat:", participantsFlat);
    console.log("setsEqual(keys, participantsFlat):", setsEqual(keys, participantsFlat));
    console.log("setsEqual(values, participantsFlat):", setsEqual(values, participantsFlat));
    */

    if (!setsEqual(keys, participantsFlatSet))
    {
        console.log("[validateAssignment] Bad keys.");
        console.log("participants:", participantsFlat);
        console.log("keys:", keys);
        return false;
    }

    if (!setsEqual(values, participantsFlatSet))
    {
        console.log("[validateAssignment] Bad values.");
        console.log("participants:", participantsFlat);
        console.log("values:", values);
        return false;
    }

    for (name in assignment)
    {
        if (inSameFamily(name, assignment[name]))
        {
            console.log(`[validateAssignment] ${name} and ${assignment[name]} in same family.`);
            return false;
        }
    }

    return true;
}


function setsEqual(s, t)
{
    for (let x of s) if (!t.has(x)) return false;
    for (let x of t) if (!s.has(x)) return false;

    return true;
}


let dummyAssignment = {
    A1: "B1",
    A2: "B2",
    A3: "B3",
    B1: "A1",
    B2: "A2",
    B3: "A3",
    B4: "C1",
    C1: "D1",
    C2: "B4",
    D1: "C2"
};

//console.log("dummyAssignment:", dummyAssignment, validateAssignment(dummyAssignment));


function shuffle(array)
{
    // Fisher Yates, from the internet
    for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
}


function zip(keys, values)
{
    let result = {}
    for (let i in keys)
        result[keys[i]] = values[i];
    return result;
}


function randomAssignment()
{
    // guess and check: random shuffle and validate

    for (let i=0; i<100; i++)
    {
        let targets = [...participantsFlat];
        shuffle(targets);
        let result = zip(participantsFlat, targets);
        let valid = validateAssignment(result);
        console.log(`(${i}) result: ${valid}\n`, result);
        if (valid)
            return result;
    }

    return null;
}


let result = randomAssignment()
console.log("\nrandom assignment:\n", result);


const jsonString = JSON.stringify(result)
fs.writeFile('./assignment.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})


