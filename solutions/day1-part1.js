/**
 * Advent of Code 2020
 * Day 1 - Part 1
 *
 * From the given list of numbers, find the
 * 2 that sum to 2020 and return their product.
 */

const {readLines} = require('../imports/readFiles.js');
const INPUT = readLines('../inputs/day1.txt', function(input) {
	return input.sort((a, b) => a - b);
});

console.log( INPUT );
