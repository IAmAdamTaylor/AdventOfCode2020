/**
 * Advent of Code 2020
 * Day 2 - Part 2
 *
 * Given a list of passwords and their conditions
 * find the number of valid passwords.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/2.2:-Day-2-Part-2
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day2.txt', (data) => {
	// map each item to a new entry data structure
	/**
	 * entry:
	 * {
	 *		min: 1,
	 *		max: 3,
	 *		char: 'a',
	 *		password: 'abcde'
	 * }
	 */
	let entries = data.filter((x) => x).map((item) => {
		let pattern = /^(\d+)-(\d+)\s([a-z]{1}):\s([a-z]+)$/;
		let matches = item.match(pattern);

		return {
			min: matches[1],
			max: matches[2],
			char: matches[3],
			password: matches[4]
		};
	});

	return entries;
});

/**
 * Check if an entry data structure is valid.
 * @param  {Object}  entry An object with keys: min, max, char, password
 * @return {Boolean} 
 */
function isEntryValid( entry ) {
	let minChar = entry.password[entry.min - 1];
	let maxChar = entry.password[entry.max - 1];

	return minChar == entry.char ^ maxChar == entry.char;
}

// filter the array to matching entries only
// and output the result
console.log( INPUT.filter(isEntryValid).length );
