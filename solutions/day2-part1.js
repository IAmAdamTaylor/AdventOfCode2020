/**
 * Advent of Code 2020
 * Day 2 - Part 1
 *
 * Given a list of passwords and their conditions
 * find the number of valid passwords.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/05.-Day-2-Part-1
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day2.txt', function(data) {
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
	let entries = data.map((item) => {
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
	let replacePattern = new RegExp(entry.char, 'g');
	let reducedPassword = entry.password.replace(replacePattern, '');
	let charCount = entry.password.length - reducedPassword.length;

	return charCount >= entry.min && charCount <= entry.max;
}

// filter the array to matching entries only
// and output the result
console.log( INPUT.filter(isEntryValid).length );
