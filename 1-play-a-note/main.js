/**
* comment here
*/

// comment
var playRandomNote = function(notes) {

	// comment
	var index = app.utils.random(notes.length - 1);

	// comment
	var note = notes[index];

	// comment
	app.audioPlayer.play(note);

};

// comment
app.events.audioLoaded.add(function(loadedArray) {
	
	// comment
	console.log('Loaded successfully: ', loadedArray);
	
	// comment
	document.addEventListener('keydown', function(event) {
		
		// comment
        if (event.metaKey || event.ctrlKey) {
          return;
        }
		playRandomNote(loadedArray);
	
	});

});

// comment
app.audioLoader.load([	
	'../assets/audio-samples/piano/A.m4a',
	'../assets/audio-samples/piano/B.m4a',
	'../assets/audio-samples/piano/C.m4a',
	'../assets/audio-samples/piano/D.m4a',
	'../assets/audio-samples/piano/E.m4a',
	'../assets/audio-samples/piano/F.m4a',
	'../assets/audio-samples/piano/G.m4a',
]);
