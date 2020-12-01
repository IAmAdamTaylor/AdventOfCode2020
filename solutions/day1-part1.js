/**
 * Advent of Code 2020
 * Day 1 - Part 1
 *
 * From the given list of numbers, find the
 * 2 that sum to 2020 and return their product.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/Day-1---Part-1
 */

// set the number we want to find
const TARGET = 2020;

const {readLines} = require('../imports/readFiles.js');
const INPUT = readLines('../inputs/day1.txt', function(data) {
	return data
		.filter((x) => x < TARGET) // remove any greater than or equal to TARGET
		.map((x) => parseInt(x)) // ensure each item is an integer
		.sort((a, b) => a - b); // sort them into numerical order
});

// get start and end indexes
let i = 0;
let j = INPUT.length - 1;
let sum = INPUT[i] + INPUT[j]; // set intial loop var

// loop until sum equals the TARGET
while ( sum !== TARGET ) {
	// if less than TARGET, advance the lower index by 1
	if ( sum < TARGET ) {
		i++;
	}

	// if greater than TARGET, retreat the higher index by 1
	if ( sum > TARGET ) {
		j--;
	}

	sum = INPUT[i] + INPUT[j];
}

// log both found numbers
console.log( INPUT[i], INPUT[j] );
// Answer is their product (multiply 2 numbers together)
console.log( INPUT[i] * INPUT[j] );
