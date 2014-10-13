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
var two = new Two({ fullscreen: true }).appendTo(document.body);

// comment
var drawRandomCircle = function() {
	
	var circle = two.makeCircle(app.utils.random(two.width - 50), app.utils.random(two.height - 50), app.utils.random(400));
	circle.fill = app.utils.randomColor();
	circle.stroke = app.utils.randomColor();
	circle.linewidth = app.utils.random(100);
	circle.scale = 0;

	two.bind('update', function(frameCount) {
		var t = (1 - circle.scale) * .125 * app.utils.random(10);
		circle.scale += t;

	}).play();

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
		drawRandomCircle();
	
	});

});

// comment
app.audioLoader.load([	
	'../assets/audio-samples/electric-piano/A.m4a',
	'../assets/audio-samples/electric-piano/B.m4a',
	'../assets/audio-samples/electric-piano/C.m4a',
	'../assets/audio-samples/electric-piano/D.m4a',
	'../assets/audio-samples/electric-piano/E.m4a',
	'../assets/audio-samples/electric-piano/F.m4a',
	'../assets/audio-samples/electric-piano/G.m4a',
]);







