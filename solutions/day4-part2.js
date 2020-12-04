/**
 * Advent of Code 2020
 * Day 4 - Part 2
 *
 * Parse the input file and check
 * how many passport entries have
 * all required keys and their values 
 * match certain conditions
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/4.2:-Day-4-Part-2
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
	let hasAllKeys = (
		'byr' in passport &&
		'iyr' in passport &&
		'eyr' in passport &&
		'hgt' in passport &&
		'hcl' in passport &&
		'ecl' in passport &&
		'pid' in passport
	);

	if ( !hasAllKeys ) {
		return false;
	}

	// check individual value conditions
	let {
		byr,
		iyr,
		eyr,
		hgt,
		hcl,
		ecl,
		pid
	} = passport; // destructure values into separate variables

	return (
		test_byr(byr) &&
		test_iyr(iyr) &&
		test_eyr(eyr) &&
		test_hgt(hgt) &&
		test_hcl(hcl) &&
		test_ecl(ecl) &&
		test_pid(pid)
	);
}

function test_byr(byr) {
	return byr >= 1920 && byr <= 2002;
}

function test_iyr(iyr) {
	return iyr >= 2010 && iyr <= 2020;
}

function test_eyr(eyr) {
	return eyr >= 2020 && eyr <= 2030;
}

function test_hgt(hgt) {
	let hgtPattern = /^(\d+)(cm|in)$/;
	let matches = hgt.match(hgtPattern);

	if ( !matches ) {
		return false;
	}

	if ( 'cm' == matches[2] && matches[1] >= 150 && matches[1] <= 193) {
		return true;
	}

	if ( 'in' == matches[2] && matches[1] >= 59 && matches[1] <= 76) {
		return true;
	}

	return false;
}

function test_hcl(hcl) {
	let hclPattern = /^#[0-9a-f]{6}$/;

	return hclPattern.test(hcl);
}

function test_ecl(ecl) {
	return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl);
}

function test_pid(pid) {
	let pidPattern = /^\d{9}$/;

	return pidPattern.test(pid);
}

console.log( INPUT.filter(isPassportValid).length );
