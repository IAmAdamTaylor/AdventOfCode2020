/**
 * Advent of Code 2020
 * Day 7 - Part 2
 *
 * Using the rules given, find the number of bags
 * that can contain at least 1 shiny gold bag.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/7.2:-Day-7-Part-2
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day7.txt', (data) => {
	// parsed data variable
	let bags = {};

	data.forEach((rule) => {
		if ( !rule ) {
			return;
		}

		// match and extract the parts of the rule we care about
		let rulePattern = /^([a-z\s]+) bags contain ([a-z0-9\s,]+)\.$/;
		let matches = rule.match(rulePattern);

		// show error and stop processing so that
		// code can be adapted to fix it
		if ( !matches ) {
			console.log( 'ERROR:' );
			console.log(rule);
			process.exit();
		}

		let parentBag = matches[1];
		let childBags = matches[2];

		// handle special case where there are no bags
		if ( 'no other bags' == childBags ) {
			bags[parentBag] = [];
			return;
		}

		bags[parentBag] = childBags.split(', ').map((subrule) => {
			let subrulePattern = /^(\d+) ([a-z\s]+) bags?$/;
			let matches = subrule.match(subrulePattern);

			// show error and stop processing so that
			// code can be adapted to fix it
			if ( !matches ) {
				console.log( 'ERROR:' );
				console.log(subrule);
				process.exit();
			}

			let count = matches[1];
			let childBag = matches[2];

			return {
				type: childBag,
				count: parseInt(count)
			};
		});
	});

	return bags;
});

function getCountInside( bag ) {
	// base case
	if ( !INPUT[bag] || !INPUT[bag].length ) {
		return 0;
	}

	let children = INPUT[bag];
	let count = 0;

	children.forEach(childBag => {
		// include bag itself
		count += childBag.count; 
		// then get the count of any bags inside it recursively
		count += getCountInside(childBag.type) * childBag.count;
	});

	return count;
}

console.log( getCountInside('shiny gold') );
