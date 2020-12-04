/**
 * Advent of Code 2020
 * Day 3 - Part 1
 *
 * Find how many trees (#) are passed when
 * moving from the top-left of the input file
 * down to the bottom, making steps of 
 * right 3, down 1 each time
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/3.1:-Day-3-Part-1
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day3.txt', (data) => {
	return data.filter((x) => x);
});

// get line length - assumes all lines are same length
const LINE_LEN = INPUT[0].length;

// set loop vars
let x = 0;
let y = 0;
let len = INPUT.length;
let treeCount = 0;

for (; y < len; y++) { // each loop move down 1
	// placed first to check the (0,0) co-ord
	treeCount += '#' == INPUT[y][x] ? 1 : 0;

	// move right 3
	x += 3;
	// wrap around if greater than length
	// simulates pattern repeating infinitely
	x %= LINE_LEN;
}

console.log( treeCount );
