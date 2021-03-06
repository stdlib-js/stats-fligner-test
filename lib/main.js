/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isCollection = require( '@stdlib/assert-is-collection' );
var isPlainObject = require( '@stdlib/assert-is-plain-object' );
var setReadOnly = require( '@stdlib/utils-define-read-only-property' );
var objectKeys = require( '@stdlib/utils-keys' );
var qnorm = require( '@stdlib/stats-base-dists-normal-quantile' );
var chisqCDF = require( '@stdlib/stats-base-dists-chisquare-cdf' );
var group = require( '@stdlib/utils-group' );
var ranks = require( '@stdlib/stats-ranks' );
var abs = require( '@stdlib/math-base-special-abs' );
var pow = require( '@stdlib/math-base-special-pow' );
var indexOf = require( '@stdlib/utils-index-of' );
var format = require( '@stdlib/string-format' );
var median = require( './median.js' );
var validate = require( './validate.js' );
var print = require( './print.js' ); // eslint-disable-line stdlib/no-redeclare


// FUNCTIONS //

/**
* Returns an array of a chosen length filled with the supplied value.
*
* @private
* @param {*} val - value to repeat
* @param {NonNegativeInteger} len - array length
* @returns {Array} filled array
*/
function repeat( val, len ) {
	var out = new Array( len );
	var i;

	for ( i = 0; i < len; i++ ) {
		out[ i ] = val;
	}
	return out;
}


// MAIN //

/**
* Computes the Fligner-Killeen test for equal variances.
*
* @param {...NumericArray} arguments - either two or more number arrays or a single numeric array if an array of group indicators is supplied as an option
* @param {Options} [options] - function options
* @param {number} [options.alpha=0.05] - significance level
* @param {Array} [options.groups] - array of group indicators
* @throws {TypeError} must provide array-like arguments
* @throws {RangeError} alpha option has to be a number in the interval `[0,1]`
* @throws {Error} must provide at least two array-like arguments if `groups` is not set
* @throws {TypeError} options must be an object
* @throws {TypeError} must provide valid options
* @returns {Object} test results
*
* @example
* // Data from Hollander & Wolfe (1973), p. 116:
* var x = [ 2.9, 3.0, 2.5, 2.6, 3.2 ];
* var y = [ 3.8, 2.7, 4.0, 2.4 ];
* var z = [ 2.8, 3.4, 3.7, 2.2, 2.0 ];
*
* var out = fligner( x, y, z );
* // returns {...}
*/
function fligner() {
	var variance;
	var options;
	var ngroups;
	var levels;
	var groups;
	var scores;
	var table;
	var alpha;
	var delta;
	var args;
	var mean;
	var opts;
	var pval;
	var sums;
	var xabs;
	var stat;
	var err;
	var loc;
	var out;
	var df;
	var M2;
	var a;
	var n;
	var x;
	var i;
	var j;

	args = [];
	ngroups = arguments.length;
	opts = {};
	if ( isPlainObject( arguments[ ngroups - 1 ] ) ) {
		options = arguments[ ngroups - 1 ];
		ngroups -= 1;
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.groups ) {
		groups = opts.groups;
		table = group( arguments[ 0 ], groups );
		levels = objectKeys( table );
		ngroups = levels.length;
		if ( ngroups < 2 ) {
			throw new Error( format( 'invalid option. `%s` option must be an array containing at least two unique elements. Option: `%s`.', 'groups', levels ) );
		}
		for ( i = 0; i < ngroups; i++ ) {
			args.push( table[ levels[ i ] ] );
		}
	} else {
		groups = [];
		for ( i = 0; i < ngroups; i++ ) {
			args.push( arguments[ i ] );
			groups = groups.concat( repeat( i, arguments[ i ].length ) );
		}
	}
	if ( opts.alpha === void 0 ) {
		alpha = 0.05;
	} else {
		alpha = opts.alpha;
	}
	if ( alpha < 0.0 || alpha > 1.0 ) {
		throw new RangeError( format( 'invalid option. `%s` option must be a number on the interval: [0, 1]. Option: `%f`.', 'alpha', alpha ) );
	}
	x = [];
	for ( i = 0; i < ngroups; i++ ) {
		if ( !isCollection( args[ i ] ) ) {
			throw new TypeError( format( 'invalid argument. Must provide array-like arguments. Value: `%s`.', args[ i ] ) );
		}
		if ( args[ i ].length === 0 ) {
			throw new Error( format( 'invalid argument. Supplied arrays cannot be empty. Value: `%s`.', args[ i ] ) );
		}
		loc = median( args[ i ] );
		for ( j = 0; j < args[ i ].length; j++ ) {
			args[ i ][ j ] -= loc;
		}
		x = x.concat( args[ i ] );
	}
	n = x.length;
	xabs = new Array( n );
	for ( i = 0; i < n; i++ ) {
		xabs[ i ] = abs( x[ i ] );
	}
	scores = ranks( xabs );
	a = new Array( n );
	mean = 0.0;
	M2 = 0.0;
	sums = repeat( 0.0, ngroups );
	for ( i = 0; i < n; i++ ) {
		a[ i ] = qnorm( ( 1.0 + ( scores[ i ]/(n+1) ) ) / 2.0, 0.0, 1.0 );
		sums[ ( levels ) ? indexOf( levels, groups[i] ) : groups[i] ] += a[ i ];
		delta = a[ i ] - mean;
		mean += delta / ( i+1 );
		M2 += delta * ( a[ i ] - mean );
	}
	variance = M2 / ( n - 1 );
	stat = 0.0;
	for ( i = 0; i < ngroups; i++ ) {
		stat += pow( sums[ i ], 2 ) / args[ i ].length;
	}
	stat = ( stat - ( n * pow( mean, 2 ) ) ) / variance;
	df = ngroups - 1;
	pval = 1.0 - chisqCDF( stat, df );

	out = {};
	setReadOnly( out, 'rejected', pval <= alpha );
	setReadOnly( out, 'alpha', alpha );
	setReadOnly( out, 'pValue', pval );
	setReadOnly( out, 'statistic', stat );
	setReadOnly( out, 'df', df );
	setReadOnly( out, 'method', 'Fligner-Killeen test of homogeneity of variances' );
	setReadOnly( out, 'print', print );
	return out;
}


// EXPORTS //

module.exports = fligner;
