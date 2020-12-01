/**
 * General purpose functions to read files into a variable.
 */

 /**
  * Read a multi-line text file into an array.
  * @param  {String}   filePath    A file path.
  * @param  {Function} transformFn Optional, A function that will be run 
  *                                on the input before it is returned.
  *                                (input) => {...}
  * @return {Array} An array of items, each being a single line from the input file.
  */
module.exports.readLines = function readLines( filePath, transformFn = null ) {
	const fs = require('fs');
	const path = require('path');
	const absPath = path.join(__dirname, filePath);

	let input = fs.readFileSync(absPath).toString().split("\n");

	// remove blank strings
	input = input.filter((x) => '' !== x);

	return transformFn ? transformFn(input) : input;
}
