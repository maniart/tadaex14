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
	var load = function(url) {
		// comment
		var request = new XMLHttpRequest();
		// comment
		var onError = function() {
			console.log('Woops. Failed to load audio file.');
		};
		// comment
		request.open('GET', url, true);
		// comment
		request.responseType = 'arraybuffer';
		// comment
		request.onload = function() {
			//debugger;
			console.log(request.response);
			app.context.decodeAudioData(request.response, function(buffer) {
				app.events.audioLoaded.dispatch(buffer);
			}, onError);
		};
		request.send();
	};

	// comment
	return {
		// comment
		load : load
	};

})();