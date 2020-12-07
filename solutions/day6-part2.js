/**
 * Advent of Code 2020
 * Day 6 - Part 2
 *
 * Parse the groups in the input file 
 * and return the sum of how many 
 * questions every single person in 
 * each group were answered
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/6.2:-Day-6-Part-2
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day6.txt', (data) => {
	const AZ = 'abcdefghijklmnopqrstuvwxyz';

	let parsedData = [];
	let tempEntry = AZ.split('');

	/**
	 * Calculate the intersection of 2 arrays.
	 * I.e. the elements shared between both
	 * @param  {Array} arr1 
	 * @param  {Array} arr2 
	 * @return {Array}
	 */
	function intersection(arr1, arr2 = []) {
		return arr1.filter(x => arr2.includes(x));
	}

	data.forEach((line) => {
		if ( line ) {
			// if the line has data, parse it and merge with 
			// any previously read data
			tempEntry = intersection(line.split(''), tempEntry);
		} else {
			// if the line is blank, push as a complete entry
			// and reset the temp store
			parsedData.push(tempEntry);
			tempEntry = AZ.split('');
		}
	});

	return parsedData;
});

console.log( INPUT.reduce((acc, curr) => {
	return acc + curr.length;
}, 0) );
