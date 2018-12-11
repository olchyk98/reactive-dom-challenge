/*
	Very simple reactive dom realization.
	Oles Odynets. 11 Dec 2018 21:02 - 21:25.
	LIHO, Flume, Rootkit, RICCI.
	Typescript.
*/

// DOM refresh
function refresh() : void {
	Object.keys(variables).forEach(io => {
		variables[io].dom.forEach(ia => {
			let a : HTMLElement = dom[ia];

			if(a) {
				a.textContent = variables[io].value;
			}
		});
	});
}

// DOM Elements
let dom : object = {};

// Variables
let variables : object = {};
{
	for(let io of document.body.getElementsByTagName('*')) {
		let a : string = io.textContent,
			b : RegExp = /{{\s|[A-z]+\s?}}/,
			c : string = a.replace(/{{|}}/g, "").trim(),
			d : number = Object.keys(variables).length;

		// TODO: variable already in the object?
		if(!b.test(a)) continue;
		if(Number.isInteger(parseInt(c[0]))) {
			console.trace('');
			throw new Error("A variable name cannot begin from a number!");
		}

		// TODO: Clear target's textContent after variable hook assigning
		io.textContent = "";

		dom[d] = io;
		if(c in variables || d in variables) {
			let ee : object = variables;
			variables[Object.keys(variables).find(io => variables[io].marker === c)].dom.push(d);
			continue;
		}

		variables[d] = {
			marker: c,
			dom: [d],
			value: ''
		}

		Object.defineProperty(variables, c, {
			get: () => {
				return variables[d];	
			},
			set: value => {
				variables[d] = {
					...variables[d],
					value
				}
				refresh();
			}
		});
	}
}

// TEST
// setTimeout(() : void => {
// 	variables.target = '123';
// }, 1500);