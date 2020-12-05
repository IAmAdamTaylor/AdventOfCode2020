/**
 * Advent of Code 2020
 * Day 5 - Part 1
 *
 * 
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/5.1:-Day-5-Part-1
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day5.txt', (data) => {
	return data.filter((x) => x);
});

/**
 * Reduce a number range to a single matching digit.
 * @param  {String} $sequence A string of 1s and 0s.
 *                            1 keeps the upper half of $num.
 *                            0 keeps the lower half of $num.
 * @param  {Number} $max      The maximum of the range.
 * @param  {Number} $min      The minimum of the range.
 *                            Optional, defaults to 0
 * @return {Number}
 */
function bsp( $sequence, $max, $min = 0 ) {
	for (let i = 0, len = $sequence.length; i < len; i++) {
		let char = $sequence[i];

		if ( 1 == char ) {
			// if keep upper bound, increase min
			$min = ($min + $max + 1) / 2;
		}

		if ( 0 == char ) {
			// if keep lower bound, decrease max
			$max = ( ($min + $max + 1) / 2 ) - 1;
		}
	}

	return $min === $max ? $min : null;
}

let maxSeatID = INPUT.reduce((acc, curr) => {
	let row = curr.substr(0, 7);
	let col = curr.substr(7, 3);

	// replace letters with binary sequence
	row = row.replace(/F/g, '0');
	row = row.replace(/B/g, '1');
	col = col.replace(/L/g, '0');
	col = col.replace(/R/g, '1');

	row = bsp(row, 127, 0);
	col = bsp(col, 7, 0);

	// calc seat ID and keep if greater than current max
	return Math.max(acc, (row * 8 + col));
}, 0);

console.log( maxSeatID );
