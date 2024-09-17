/* eslint-disable @typescript-eslint/no-unused-vars */
export default undefined;

declare function readDataFromApi(): unknown;

const d = readDataFromApi()
if (typeof d === "string") {
	d.toUpperCase();
}



function sayWhat(s: "Hello" | "Goodbye")  {

	switch (s) {
		case "Hello":
			return "Moin"
		case "Goodbye":
			return "Tschüss!"
	}

	const y: never = s;

	handleInvalidMessage(s);
}

function fail(): never {
	throw new Error("...");
}

function handleInvalidMessage(msg: never) {
	// ....
}


sayWhat("Hello")
