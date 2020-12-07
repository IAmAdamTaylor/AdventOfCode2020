/**
 * Advent of Code 2020
 * Day 7 - Part 1
 *
 * Using the rules given, find the number of bags
 * that can contain at least 1 shiny gold bag.
 * 
 * @see https://github.com/IAmAdamTaylor/AdventOfCode2020/wiki/7.1:-Day-7-Part-1
 */

const {readLines} = require('adventOfCode');
const INPUT = readLines('inputs/day7.txt', (data) => {
	// parsed data variable
	let bags = {};

	/**
	 * Add a bag and it's ancestor to the parsed array.
	 * @param {String} bag      A bag type.
	 * @param {String} ancestor A bag type.
	 */
	function addBag( bag, ancestor ) {
		if ( !bags[bag] ) {
			// the first time we encounter a bag, 
			// create a blank array entry for it
			bags[bag] = [];
		}

		// then push the ancestor onto that to associate the 2
		bags[bag].push(ancestor);
	}

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
			return;
		}

		childBags.split(', ').forEach((subrule) => {
			let subrulePattern = /^(\d+) ([a-z\s]+) bags?$/;
			let matches = subrule.match(subrulePattern);

			// show error and stop processing so that
			// code can be adapted to fix it
			if ( !matches ) {
				console.log( 'ERROR:' );
				console.log(subrule);
				process.exit();
			}

			let childBag = matches[2];

			addBag(childBag, parentBag);
		});
	});

	return bags;
});

function getAncestors( bag ) {
	// base case
	if ( !INPUT[bag] || !INPUT[bag].length ) {
		return bag;
	}

	// recursive case
	let ancestors = [];
	let parents = INPUT[bag];
	parents.forEach(bagType => {
		ancestors = ancestors.concat(getAncestors(bagType));
	});

	return [bag].concat(ancestors);
}

// de-duplicate the array using a Set
// finally return the length of how many bags were found
// - 1 because shiny gold will be in the returned set
console.log( [...new Set(getAncestors('shiny gold'))].length - 1 );
