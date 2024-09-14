/* eslint-disable @typescript-eslint/no-unused-vars */
export default undefined;

// Diese Funktion soll einen Parameter engegennehmen.
//  Der Parameter soll entwender:
//    - ein String sein ODER
//    - ein "Person"-Objekt mit drei Eigenschaften:
//       - name (String)
//       - age (Zahl)
//       - married (Boolean)
//  Die Funktion kann sowohl null als auch einen String zurückliefern.
//
//  - todo: Vervollständige die Funktionssignatur mit den erforderlichen Typ-Angaben,
//    so dass die Compile-Fehler verschwinden
type Person = { name: string; age: number; married: boolean };
declare function createGreeting(g: Person | string): string | null;

const greeting = createGreeting("hallo");

if (greeting === null) {
	console.log("Kein Greeting");
} else {
	console.log(greeting.toUpperCase());
}

createGreeting({ name: "Klaus", age: 32, married: false });

// -------------------------------------------------------------
type GreetingGeneratorFn = (includePrefix?: boolean) => string;

// Die greet-Funktion soll einen Parameter haben, der dem Typ einer (Callback-)Funktion
// entspricht.
//   - Die Callback-Funktion hat einen Parameter: includePrefix
//     - dieser soll optional sein, aber wenn gesetzt, muss es ein Boolean sein
//   - Die Callback soll einen String zurückliefern
// - todo: Vervollständige also die Signatur, so dass es keine Fehler mehr gibt

function greet(greetingGenerator: GreetingGeneratorFn) {
	greetingGenerator(true).toUpperCase();
	greetingGenerator().toUpperCase();
}

// Nur zum sicherstellen, dass die Typen korrekt gesetzt sind.
// Der Code hat ansonsten keinen Sinn.
greet(b => {
	function fail(_: never): never {
		throw new Error("...");
	}
	if (b === true) {
		// boolean
		return "mit prefix";
	}
	if (b === false) {
		return "ohne prefix";
	}

	if (b === undefined) {
		return "ganz und gar ohne prefix"
	}

	fail(b);
});

// -------------------------------------------------------

type GreetUiConfig = {
	color?: string;
	greetings: string[];
	onAddGreetClick(): void;
};

// Die GreetUi-Funktion entspricht von der Signatur einer React-Komponente mit Properties
//
// todo: Ergänze die Signatur, so dass der erste und einzige Parameter ein Objekt ist mit drei Eigenschaften:
//  - color: Ein (optionaler) String
//  - greeetings: Eine Liste von Strings
//  - onAddGreetClick: eine Funktion ohne Parameter, die nichts zurückliefert

function GreetUi({ color, greetings, onAddGreetClick }: GreetUiConfig): void {
	color?.toLowerCase();
	greetings.map(g => g.toUpperCase());
	return onAddGreetClick();
}

GreetUi({
	color: "black",
	greetings: ["Hallo"],
	onAddGreetClick() {}
});

GreetUi({
	greetings: ["Hallo"],
	onAddGreetClick() {}
});

// -------------------------------------------------------------
// "Simulierte" useState-Funktion
//  (der Type von useState ist etwas komplexer, außerdem ist
//   hier der zweite Eintrag im Tuple, die setter-Funktion
//   ausgelassen)
//
declare function reactUseState<T = undefined>(initial: T | undefined): [T];

// todo: Ergänze die Typ-Parameter für die reactUseState-Aufrufe, so dass die
// Compile-Fehler verschwinden
const [greetings] = reactUseState<string[]>([]);
greetings.forEach(g => g.toUpperCase());

type Address = { city: string };

const [address] = reactUseState<Address | string>({ city: "Hamburg" });
if (typeof address === "object") {
	console.log(address.city.toUpperCase());
} else {
	console.log(address.toUpperCase());
}
