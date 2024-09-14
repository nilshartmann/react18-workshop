type Person = {
  firstname: string;
  age: number;
};

type NameFormatterFn = (name: string) => string;

export function formatPersons(persons: Person[], formatter: NameFormatterFn): string[] {
  return persons.map(p => formatter(p.firstname));
}
