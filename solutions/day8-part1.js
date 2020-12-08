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
	let acc = 0;
	let i = 0;
	let visitedLines = new Set();
	let x = 0;

	while ( i < INPUT.length ) {
		let size = visitedLines.size;
		visitedLines.add(i);

		if ( visitedLines.size === size ) {
			return acc;
		}

		let line = INPUT[i];
		let operation = line.substr(0, 3);
		let argument = line.substr(4);

		if ( 'nop' == operation ) {
			i++;
		}

		if ( 'acc' == operation ) {
			acc += parseInt(argument);
			i++;
		}

		if ( 'jmp' == operation ) {
			i += parseInt(argument);
		}
	}

	// fail safe if the loop exits and makes it this far
	return acc;
}

console.log( getInfLoop() );
