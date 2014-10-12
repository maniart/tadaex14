/**
 * comment here
*/

// comment
var app = app || {};

// comment
app.audioLoader = (function() {

	// comment here
	app.context = app.context || new AudioContext();


	// comment here
	var load = function(loadArray) {
		// comment here
		var bufferLoader = new app.BufferLoader(
			// comment here
			app.context,
			// comment here
			loadArray,
			// comment here
			function(bufferList) {
				app.events.audioLoaded.dispatch(bufferList);
			}

		); 
		bufferLoader.load();
	};

	// comment
	return {
		// comment
		load : load
	};

})();