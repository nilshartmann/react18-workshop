// Übung: Promises

// loadGreetingFromServer liefert ein Objekt mit einen Gruß für den Namen zurück,
// oder einen Fehler wenn kein name angegeben wurde.
//  Diese Funktion ist "fertig", die musst Du nur verwenden.
//
// Im Erfolgsfall liefert die Funktion ein Promise zurückgegeben, das zum folgenden
// Objekt aufgelöst wird { phrase: ..., name: ... }

// 1. Vervollständige getGreetingAsString (s.u.)
// 2. Vervollständige die Aufrufe von getGreetingAsString (s.u.)

function loadGreetingFromServer(name) {
  // Diese Funktion steht exemplarisch für eine fertige, asynchrone Funktion,
  // die z.B. von einer Bibliothek zur Verfügung gestellt wird.
  //
  // Sie liefert ein Objekt mit einem Gruß für den übergebenen Namen zurück
  // ("greeting-as-a-service")
  //
  // Im echten Leben würde die Funktion zum Beispiel eine HTTP API aufrufen.
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

function getGreetingAsString(name) {
  // Implementiere diese Funktion
  // Die Funktion soll loadGreetingFromServer mit 'name' aufrufen und
  //   - im Erfolgsfall einen String zurückliefern, in dem die Daten des von
  //     loadGreetingFromServer zurückgelieferte Greeting-Objekts enthalten sind
  //     Das Greeting-Objekt besteht auf 'name' und 'phrase'
  //   - im Fehlerfall einen String zurückliefern mit einer Fehlermeldung
  //
  // Du kannst Promise-Ketten oder async/await API verwenden
}

// Führe getGreetingAsString aus und gib das Ergebnis auf der Konsole aus
//   - Im ersten Fall ("Susi") sollte eine Meldung mit dem Gruß erscheinen
//   - Im zweiten Fall ("null") sollte eine Fehlermeldung erscheinen
//
// Zusatz-Aufgabe:
//  - kannst Du sicherstellen, dass die Ausgabe für Susi *immer* vor der Ausgabe
//    von "null" auf der Konsole erscheint?

getGreetingAsString("Susi");
getGreetingAsString(null);

