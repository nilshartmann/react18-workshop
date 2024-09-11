// Übung: Promises

// loadGreetingFromServer liefert ein Objekt mit einen Gruß für den Namen zurück,
// oder einen Fehler wenn kein name angegeben wurde.
//
// Im Erfolgsfall wird ein Promise zurückgegeben, das zum folgenden
// Objekt aufgelöst wird { phrase: ..., name: ... }

// 1. Vervollständige getGreetingAsString (s.u.)
// 2.

function loadGreetingFromServer(name) {
  // Diese Funktion steht exemplarisch für eine asynchrone Funktion,
  // die z.B. eine Bibliothek zur Verfügung stellt.
  // In der Regel wirst Du Promises selbst nicht erzeugen müssen,
  // sondern nur mit Promise-Objekten arbeiten, die Du von einer Funktion
  // zurückgeliefert bekommst
  return new Promise((resolve, reject) => {
    const timeout = name ? 500 : 250;

    setTimeout(() => {
      if (!name) {
        return reject("Must specify name");
      }
      return resolve({
        phrase: "Hello",
        name
      });
    }, timeout);
  });
}

async function getGreetingAsString(name) {
  // Implementiere diese Funktion
  // Die Funktion soll loadGreetingFromServer mit 'name' aufrufen und
  //   - im Erfolgsfall einen String zurückliefern, in dem die Daten des von
  //     loadGreetingFromServer zurückgelieferte Greeting-Objekts enthalten sind
  //   - im Fehlerfall einen String zurückliefern mit einer Fehlermeldung
  try {
    const greeting = await loadGreetingFromServer(name);
    return `${greeting.phrase} ${greeting.name}`;
  } catch (error) {
    return `Could not greet ${name}: ${error}`
  }
}

// Führe getGreetingAsString aus und gib das Ergebnis auf der Konsole aus
//   - Im ersten Fall ("Susi") sollte eine Meldung mit dem Gruß erscheinen
//   - Im zweiten Fall ("null") sollte eine Fehlermeldung erscheinen
//
// Zusatz:
//  - kannst Du sicherstellen, dass die Ausgabe für Susi *immer* vor der Ausgabe
//    von "null" kommt?
async function greet() {
  const greetingForSusi = await getGreetingAsString("Susi");
  console.log(greetingForSusi);
  const greetingError = await getGreetingAsString(null);
  console.log(greetingError);
}

greet();



