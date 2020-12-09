/**
 * Advent of Code 2020
 * Day 9 - Part 1
 *
 * Find the first line with a number that is not a sum of
 * 2 distinct numbers from the 25 previous lines.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/9.1:-Day-9-Part-1
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day9.txt', (data) => {
	return data.filter((x) => x); // remove blank lines
});

/**
 * Calculate every possible sum of numbers from arr.
 * @param  {Array} arr An array of numbers.
 * @return {Array}     
 */
function enumSums( arr ) {
	let sums = [];

	arr.forEach(a => {
		arr.forEach(b => {
			if ( a != b ) {
				sums.push(parseInt(a) + parseInt(b));
			}
		});
	});

	return sums;
}

let answer = (() => {
	for (let i = 25, len = INPUT.length; i < len; i++) {
		let num = parseInt(INPUT[i]);
		let preamble = INPUT.slice(i - 25, i);

		if ( !enumSums(preamble).includes(num) ) {
			return num;
		}
	}
})();

// export part 1 for use in part 2
module.exports.ANSWER = answer;

console.log( 'Part 1:', answer );
