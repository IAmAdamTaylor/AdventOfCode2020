/**
 * Advent of Code 2020
 * Day 5 - Part 1
 *
 * From each sequence of seat characters
 * find the row, column and seat ID it represents
 * and then return the highest seat ID found.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/5.1:-Day-5-Part-1
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day5.txt', (data) => {
	function rankLetters( line ) {
		// replace letters with numbers matching their rank
		line = line.replace(/F/g, '3');
		line = line.replace(/B/g, '4');
		line = line.replace(/L/g, '1');
		line = line.replace(/R/g, '2');

		return line;
	}

	return data
		.filter((x) => x)
		.sort((a, b) => {
			a = rankLetters(a);
			b = rankLetters(b);

			return b - a; // desc numeric sort
		});
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

let maxSeat = INPUT[0];
let row = maxSeat.substr(0, 7);
let col = maxSeat.substr(7, 3);

// replace letters with binary sequence
row = row.replace(/F/g, '0');
row = row.replace(/B/g, '1');
col = col.replace(/L/g, '0');
col = col.replace(/R/g, '1');

row = bsp(row, 127, 0);
col = bsp(col, 7, 0);

console.log( row * 8 + col );
