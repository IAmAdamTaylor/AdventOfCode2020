/**
 * Advent of Code 2020
 * Day 8 - Part 2
 *
 * Change 1 instruction 
 * - `jmp` to `nop`, or
 * - `nop` to `jmp`
 * in order to make the program run till the end.
 * Return the accumulator when it does.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/8.2:-Day-8-Part-2
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day8.txt', (data) => {
	return data.filter((x) => x); // remove blank lines
});

function getRoute() {
	// set loop variables
	let acc = 0;
	let i = 0;
	let visitedLines = new Set();
	let visitedInstructions = [];

	while ( i < INPUT.length - 1 ) {
		// get the existing size and try to add the current line
		let size = visitedLines.size;
		visitedLines.add(i);

		// if the sizes match, we've been on this line before
		// this is the duplicate, so return
		if ( visitedLines.size === size ) {
			return visitedInstructions;
		}

		// otherwise parse the 2 parts of the instruction
		let line = INPUT[i];
		let operation = line.substr(0, 3);
		let argument = line.substr(4);

		visitedInstructions.push({
			line: i,
			operation,
			argument,
			jmpDest: i + parseInt(argument)
		});

		// acc == move to next line
		// nop == move to next line
		if ( 'acc' == operation || 'nop' == operation ) {
			i++;
		}

		// jmp == move argument lines up or down
		if ( 'jmp' == operation ) {
			i += parseInt(argument);
		}
	}

	// fail safe if the loop exits and makes it this far
	return false;
}

/**
 * Run instructions until one is run twice.
 * Using a function wrapper to let return break the loop.
 * @param {Array}    program A copy of INPUT with 1 line changed.
 * @return {Integer} The accumulator when a duplicate 
 *                   instruction is reached.
 */
function runProgram( program ) {
	// set loop variables
	let acc = 0;
	let i = 0;
	let visitedLines = new Set();

	while ( i < program.length - 1 ) {
		// get the existing size and try to add the current line
		let size = visitedLines.size;
		visitedLines.add(i);

		// if the sizes match, we've been on this line before
		// this is the duplicate, so return false
		if ( visitedLines.size === size ) {
			return false;
		}

		// otherwise parse the 2 parts of the instruction
		let line = program[i];
		let operation = line.substr(0, 3);
		let argument = line.substr(4);

		// nop == do nothing, move to next line
		if ( 'nop' == operation ) {
			i++;
		}

		// acc == add the argument to the accumulator
		//        then move to next line
		if ( 'acc' == operation ) {
			acc += parseInt(argument);
			i++;
		}

		// jmp == move argument lines up or down
		if ( 'jmp' == operation ) {
			i += parseInt(argument);
		}
	}

	// once the loop exits, return acc
	return acc;
}

// get the looping programs route, containing all possible `jmp` & `nop`
// change each one in turn and test the program to see if it works

let route = getRoute().filter(x => x.operation != 'acc');
route.forEach((test) => {
	// shallow copy the input array
	let program = [...INPUT];

	// Change a `nop` => `jmp` or vice versa
	program[test.line] = program[test.line].replace( test.operation, 'nop' == test.operation ? 'jmp' : 'nop' );

	// check if this change produces a result
	let result = runProgram(program);

	if ( result ) {
		console.log( 'Result is', result );
	}
});
