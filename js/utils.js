/**
 * comment here
*/

// comment
var app = app || {};

app.utils = (function() {

	// comment
	var random = function(max) {
		// comment
  		return Math.abs(Math.round((Math.random() * max)));
	};

	// comment
	var randomColor = function() {
		return	'rgb(' + app.utils.random(255) + ',' + app.utils.random(255) + ',' +  app.utils.random(255)+ ')';
	};

	// comment
	var map = function ( number,  in_min , in_max , out_min , out_max ) {
		return ( number - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
	};


	// comment
	return {
		random : random,
		randomColor : randomColor,
		map : map
	};

})();
