/**
 * Advent of Code 2020
 * Day 4 - Part 1
 *
 * Parse the input file and check
 * how many passport entries have
 * all required keys
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/4.1:-Day-4-Part-1
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day4.txt', (data) => {
	let parsedData = [];
	let tempEntry = {};

	/**
	 * Parse the key value pairs from an input line.
	 * @param  {String} line Text with 'key:value' pairs, space separated.
	 * @return {Object} 
	 */
	function getObject( line ) {
		let pairs = line.split(' ');

		let obj = pairs.reduce((acc, curr) => {
			let [key, value] = curr.split(':');
			acc[key] = value;

			return acc;
		}, {});

		return obj;
	}

	data.forEach((line) => {
		if ( line ) {
			// if the line has data, parse it and merge with 
			// any previously read data
			Object.assign(tempEntry, getObject(line));
		} else {
			// if the line is blank, push as a complete entry
			// and reset the temp store
			parsedData.push(tempEntry);
			tempEntry = {};
		}
	});

	return parsedData;
});

/**
 * Check if a passport object is valid.
 *
 * Required:
 * - byr (Birth Year)
 * - iyr (Issue Year)
 * - eyr (Expiration Year)
 * - hgt (Height)
 * - hcl (Hair Color)
 * - ecl (Eye Color)
 * - pid (Passport ID)
 *
 * Optional:
 * - cid (Country ID)
 * 
 * @param  {Object}  passport An object with the keys stated above
 * @return {Boolean}
 */
function isPassportValid( passport ) {
	return (
		'byr' in passport &&
		'iyr' in passport &&
		'eyr' in passport &&
		'hgt' in passport &&
		'hcl' in passport &&
		'ecl' in passport &&
		'pid' in passport
	);
}

console.log( INPUT.filter(isPassportValid).length );
