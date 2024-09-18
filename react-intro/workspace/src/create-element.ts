export default undefined;

type Element = {
	createElement: typeof createElement
}

declare function createElement(name: string, children?: string|string[]): string;

// <div><h1>Hello World</h1></div>

