import { expect, test, vi } from "vitest";
import { formatPersons } from "../format-persons";

const persons = [
  { firstname: "Klaus", age: 32 },
  { firstname: "Susi", age: 37 }
];

test("format persons", () => {
  const mockFormatter = vi.fn();

  formatPersons(persons, mockFormatter);

  expect(mockFormatter).toBeCalledTimes(2);
  expect(mockFormatter.mock.calls[0][0]).toEqual("Klaus");
  expect(mockFormatter.mock.calls[1][0]).toEqual("Susi");
});
