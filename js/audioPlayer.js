/**
 * comment here
*/

// comment
var app = app || {};

// comment
app.audioPlayer = (function() {

	if (!app.context.createGain) {
		app.context.createGain = app.context.createGainNode;	
	}
    
	var gain = app.context.createGain();
	// comment
	var play = function(buffer, time, gainNode) {
		
		// creates a sound source
		var source = app.context.createBufferSource();
	
		
		// tell the source which sound to play
		source.buffer = buffer;
		
		if(gainNode) {
			console.log('gain node present');
			source.connect(gain);
			gain.connect(app.context.destination);
		} else {
			// connect the source to the context's destination (the speakers)
			source.connect(app.context.destination);
	
		}

		
		// comment
		if (!source.start) {
			source.start = source.noteOn;			
		}
		// start playing the audio at the given time
		source.start(time);
	};

	// comment
	var repeat = function(note, tempo, bars) {
		// comment
		
		// We'll start playing the rhythm 100 milliseconds from "now"
		var startTime = app.context.currentTime + 0.100;
		// comment
		var tempo = tempo || 80; // BPM (beats per minute)

		// comment
		var bars = bars || 1; // number of bars to play this note
		
		// comment
		var eighthNoteTime = (60 / tempo) / 2;

		// Play "bars" time of the following:
		for (var bar = 0; bar < bars; bar++) {
			var time = startTime + bar * 8 * eighthNoteTime;
			play(note, time);
		}

	};

	// comment
	return {

		// comment
		play : play,

		// comment
		repeat : repeat,

		gain : gain
		
	};

})();