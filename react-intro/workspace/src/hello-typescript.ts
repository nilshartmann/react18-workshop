export default undefined;

let person: string | null = "Klaus";

person = "Klaus";
person = null;
// person = 7;
// person = true;


interface IEmployee {
	firstname: string;
	age: number;
}

type GreeterFn = (prefix: string) => string;

type Employee = {
	firstname: string;
	age: number;

	greet: GreeterFn

	greet2(prefix: string): string
}

// function createList<L>(): L[] {
// 	return []
// }

type Company = {
	employees: Array<Employee>
}

const employee = {
	firstname: "Klaus",
	age: 32,

	greet(prefix: string) {
		return prefix + ", " + this.firstname;
	}
}

type Animal = {
	name: string;
	// firstname: string;
}

type EmployeeOrAnimal = Employee | Animal


employee.greet("Hello");

export function sayHello(p: string | null | EmployeeOrAnimal ) {

	if (p === null) {  // Type Guards
		return null;
	}

	if (typeof p === "object") { // Type Guards
		if ("firstname" in p) { // Type Guards
			return p.greet("Hello");
		} else {
			return p.name.toLowerCase();
		}
	}

	return p.toUpperCase();

}

 // sayHello(123);
const hello = sayHello("fasdfsadf")
hello.toUpperCase();
