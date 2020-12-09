/**
 * Advent of Code 2020
 * Day 9 - Part 2
 *
 * Find the contiguous set of numbers which add
 * up to the answer from part 1.
 * The answer is the smallest and largest numbers
 * in that set added together.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/9.1:-Day-9-Part-1
 */

const {readLines, sumArray} = require('adventOfCode');
const {ANSWER: PART_1} = require('./day9-part1.js');
const INPUT = readLines('inputs/day9.txt', (data) => {
	return data
		.filter((x) => x) // remove blank lines
		.map(x => parseInt(x)); // parse all lines to numbers
});

let answer = (() => {
	let set = [];

	// add first 2 lines
	set.push(INPUT[0]);
	set.push(INPUT[1]);

	// set loop variable to next line to be considered
	let i = 2;
	let setSum = sumArray(set);

	while( setSum != PART_1 ) {
		if ( setSum > PART_1 ) {
			set.shift();
		}

		if ( setSum < PART_1 ) {
			set.push(INPUT[i]);
			i++;
		}

		setSum = sumArray(set);
	}

	return Math.min(...set) + Math.max(...set);
})();

console.log( 'Part 2:', answer );
