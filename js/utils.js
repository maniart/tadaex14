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
	return {
		random : random,
		randomColor : randomColor
	};

})();
