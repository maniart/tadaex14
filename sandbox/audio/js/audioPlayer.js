/**
 * comment here
*/

// comment
var app = app || {};

// comment
app.audioPlayer = (function() {

	// comment
	var play = function(buffer) {
		
		// creates a sound source
		var source = app.context.createBufferSource();
		
		// tell the source which sound to play
		source.buffer = buffer;
		
		// connect the source to the context's destination (the speakers)
		source.connect(app.context.destination);

		// start playing the audio
		source.start(0);
	};

	// comment
	return {
		play : play
	};

})();