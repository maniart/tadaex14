/**
* comment here
*/

// comment
app.events.audioLoaded.add(function(loadedArray) {
	// comment
	console.log('Loaded successfully: ', loadedArray);
	// comment
	app.audioPlayer.repeat(loadedArray[0], 80, 4);
});

// comment
app.audioLoader.load([	
	'../assets/audio-samples/piano/A.m4a',
]);
