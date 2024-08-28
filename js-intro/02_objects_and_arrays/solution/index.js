console.log("Please edit index.js");

function createPerson(name, age = 18) {
  return { name: name, age: age };
}

const klaus = createPerson("Klaus", 42);
const christian = createPerson("Christian");
const susi = createPerson("Susi", 39);

const persons = [klaus, christian, susi];

// oder "inline":
// const persons = [createPerson("Klaus", 42),createPerson("Christian") ,createPerson("Susi", 39)];

function printPersons(persons) {
  persons.forEach(p => console.log(`Person heisst ${p.name} und ist ${p.age} Jahre alt`));
}

printPersons(persons);

// Erwartetes Ergebnis:
//  Person heisst Klaus und ist 42 Jahre alt
//  Person heisst Christian und ist 18 Jahre alt
//  Person heisst Susi und ist 39 Jahre alt

// SCHRITT 4: (statt "printPersonsAdvanced" kannst Du deine printPersons-Funktion erweitern):
function printPersonsAdvanced(persons, formatName) {
  persons.forEach(p => {
    const name = typeof formatName === "function" ? formatName(p.name) : p.name;
    console.log(`Person heisst ${name} und ist ${p.age} Jahre alt`);
  });
}

printPersonsAdvanced(persons, name => name.toUpperCase());
// Erwartetes Ergebnis:
//  Person heisst KLAUS und ist 42 Jahre alt
//  Person heisst CHRISTIAN und ist 18 Jahre alt
//  Person heisst SUSI und ist 39 Jahre alt
