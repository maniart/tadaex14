/**
 * comment here
*/

// comment
var app = app || {};

// comment
app.audioPlayer = (function() {

	// comment
	var play = function(buffer, time) {
		
		// creates a sound source
		var source = app.context.createBufferSource();
		
		// tell the source which sound to play
		source.buffer = buffer;
		
		// connect the source to the context's destination (the speakers)
		source.connect(app.context.destination);

		// comment
		if (!source.start) {
			source.start = source.noteOn;			
		}
		// start playing the audio at the given time
		source.start(time);
	};

	// comment
	return {
		play : play
	};

})();