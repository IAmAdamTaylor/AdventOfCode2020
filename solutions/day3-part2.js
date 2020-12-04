/**
 * Advent of Code 2020
 * Day 3 - Part 2
 *
 * Find how many trees (#) are passed for
 * multiple slope passes of the input file.
 * Multiply the answers together to get the solution.
 * 
 * Slopes to check are:
 * 		Right 1, down 1.
 *		Right 3, down 1. (Part 1)
 *		Right 5, down 1.
 *		Right 7, down 1.
 *		Right 1, down 2.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/3.2:-Day-3-Part-2
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day3.txt', (data) => {
	return data.filter((x) => x);
});

// get line length - assumes all lines are same length
const LINE_LEN = INPUT[0].length;

function findTreesForSlope( deltaX = 0, deltaY = 0 ) {
	// set loop vars
	let x = 0;
	let y = 0;
	let len = INPUT.length;
	let treeCount = 0;

	for (; y < len; y += deltaY) { // each loop move down by Y
		// placed first to check the (0,0) co-ord
		treeCount += '#' == INPUT[y][x] ? 1 : 0;

		// move right X amount
		x += deltaX;
		// wrap around if greater than length
		// simulates pattern repeating infinitely
		x %= LINE_LEN;
	}

	return treeCount;
}

// using 1 because we will be multiplying other
// values onto it, this is equivalent to 0 for addition
let fullTreeCount = 1;

fullTreeCount *= findTreesForSlope(1, 1);
fullTreeCount *= findTreesForSlope(3, 1);
fullTreeCount *= findTreesForSlope(5, 1);
fullTreeCount *= findTreesForSlope(7, 1);
fullTreeCount *= findTreesForSlope(1, 2);

console.log( fullTreeCount );
