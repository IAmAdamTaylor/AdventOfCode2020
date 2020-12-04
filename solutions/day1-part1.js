/**
 * Advent of Code 2020
 * Day 1 - Part 1
 *
 * From the given list of numbers, find the
 * 2 that sum to 2020 and return their product.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/1.1:-Day-1-Part-1
 */

// set the number we want to find
const TARGET = 2020;

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day1.txt', (data) => {
	return data
		// remove any falsey values
		// remove any greater than or equal to TARGET
		.filter((x) => x && x < TARGET) 
		.map((x) => parseInt(x)) // ensure each item is an integer
		.sort((a, b) => a - b); // sort them into numerical order
});

// get start and end indexes
let i = 0;
let j = INPUT.length - 1;
let sum = INPUT[i] + INPUT[j]; // set intial loop var

// loop until sum equals the TARGET
while ( sum !== TARGET ) {
	// if less than TARGET, increment the lower index by 1
	// to give a higher sum
	if ( sum < TARGET ) {
		i++;
	}

	// if greater than TARGET, decrement the higher index by 1
	// to give a lower sum
	if ( sum > TARGET ) {
		j--;
	}

	sum = INPUT[i] + INPUT[j];
}

// log both found numbers
console.log( INPUT[i], INPUT[j] );
// Answer is their product (multiply numbers together)
console.log( INPUT[i] * INPUT[j] );
