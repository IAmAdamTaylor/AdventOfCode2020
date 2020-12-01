/**
 * Advent of Code 2020
 * Day 1 - Part 2
 *
 * From the given list of numbers, find the
 * 3 that sum to 2020 and return their product.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/Day-1---Part-2
 */

// set the number we want to find
const TARGET = 2020;

const {readLines} = require('../imports/fileSystemFns.js');
const INPUT = readLines('../inputs/day1.txt', function(data) {
	return data
		.filter((x) => x < TARGET) // remove any greater than or equal to TARGET
		.map((x) => parseInt(x)) // ensure each item is an integer
		.sort((a, b) => a - b); // sort them into numerical order
});

// get start, 2nd item and end indexes
let i = 0;
let j = 1;
let k = INPUT.length - 1;
let sum = INPUT[i] + INPUT[j] + INPUT[k]; // set intial loop var

// loop until sum equals the TARGET
while ( sum !== TARGET ) {
	// if less than TARGET, increment one of the lower indexes by 1
	// to give a higher sum
	if ( sum < TARGET ) {
		if ( j - i === 1 ) {
			// increment j when it is adjacent to i
			j++;
		} else {
			// otherwise increment i (move closer to j)
			i++;
		}
	}

	// if greater than TARGET, decrement the higher index by 1
	// to give a lower sum
	if ( sum > TARGET ) {
		k--;
	}

	sum = INPUT[i] + INPUT[j] + INPUT[k];
}

// log all found numbers
console.log( INPUT[i], INPUT[j], INPUT[k] );
// Answer is their product (multiply numbers together)
console.log( INPUT[i] * INPUT[j] * INPUT[k] );
