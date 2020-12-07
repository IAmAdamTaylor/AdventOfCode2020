/**
 * Advent of Code 2020
 * Day 6 - Part 1
 *
 * Parse the groups in the input file 
 * and return the sum of how many 
 * unique questions per group were answered
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/6.1:-Day-6-Part-1
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day6.txt', (data) => {
	let parsedData = [];
	let tempEntry = new Set();

	data.forEach((line) => {
		if ( line ) {
			// if the line has data, parse it and merge with 
			// any previously read data
			for (var i = 0, len = line.length; i < len; i++) {
				tempEntry.add(line[i]);
			}
		} else {
			// if the line is blank, push as a complete entry
			// and reset the temp store
			parsedData.push(tempEntry);
			tempEntry = new Set();
		}
	});

	return parsedData;
});

console.log( INPUT.reduce((acc, curr) => {
	return acc + curr.size;
}, 0) );
