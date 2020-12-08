/**
 * Advent of Code 2020
 * Day 8 - Part 1
 *
 * Follow the assembly instructions given
 * and find the accumulator value just before
 * an instruction is repeated for the first time
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/8.1:-Day-8-Part-1
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day8.txt', (data) => {
	return data.filter((x) => x);
});

/**
 * Run instructions until one is run twice.
 * Using a function wrapper to let return break the loop.
 * @return {Integer} The accumulator when a duplicate 
 *                   instruction is reached.
 */
function getInfLoop() {
	// set loop variables
	let acc = 0;
	let i = 0;
	let visitedLines = new Set();

	while ( i < INPUT.length ) {
		// get the existing size and try to add the current line
		let size = visitedLines.size;
		visitedLines.add(i);

		// if the sizes match, we've been on this line before
		// this is the duplicate, so return
		if ( visitedLines.size === size ) {
			return acc;
		}

		// otherwise parse the 2 parts of the instruction
		let line = INPUT[i];
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

	// fail safe if the loop exits and makes it this far
	return acc;
}

console.log( getInfLoop() );
