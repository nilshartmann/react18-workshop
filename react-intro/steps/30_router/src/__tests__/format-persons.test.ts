import { expect, test, vi } from "vitest";
import { formatPersons } from "./format-persons";

const persons = [
  { firstname: "Klaus", age: 32 },
  { firstname: "Susi", age: 37 }
];

test("format persons", () => {
  // todo:
  //
  //  - Schreibe einen Test für die 'formatPersons'-Funktion
  //    - Erzeuge eine Mock-Funktion für den "formatter"
  //    - Rufe 'formatPersons' mit dem 'persons'-Array (siehe oben) auf
  //    - Stelle sicher, dass der "Formatter"-Mock einmal mit
  //         "Klaus" und einmal mit "Susi" aufgerufen wurde

  const mockFormatter = vi.fn();

  formatPersons(persons, mockFormatter);

  expect(mockFormatter).toBeCalledTimes(2);
  expect(mockFormatter.mock.calls[0][0]).toEqual("Klaus");
  expect(mockFormatter.mock.calls[1][0]).toEqual("Susi");
});
