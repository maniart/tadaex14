/**
* comment here
*/

var playRandomNoteAndDraw
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
two.scene.translation.set(two.width/2, two.height/2);




// comment
var generatePoints = function(amount, radius) {
	var vertices = 0;
	var r = Math.random() * radius + radius / 2;
	return _.map(_.range(amount), function(i) {
	  var pct = i / amount;
	  var angle = pct * Math.PI * 2;
	  var x = r * Math.cos(angle);
	  var y = r * Math.sin(angle);
	  var anchor = new Two.Anchor(x, y);
	  anchor.origin = new Two.Vector().copy(anchor);
	  vertices++;
	  return anchor;
	});
};

// comment
var drawPolygon = function(sides) {
	var polygon = two.makePolygon(generatePoints(sides, 4), false);
	var translateX = app.utils.random(two.width);
	var translateY = app.utils.random(two.height);
	polygon.fill = app.utils.randomColor();
	polygon.stroke = app.utils.randomColor();
	polygon.linewidth = app.utils.random(100);
	polygon.translation.set(translateX, translateY);
	polygon.scale = 0;

	two.bind('update', function(frameCount) {
		var t = (1 - polygon.scale) * .125 * app.utils.random(10);
		var t2 = (1 - translateX) * .0125 * app.utils.random(10);
		var t3 = (1 - translateY) * .0125 * app.utils.random(10);
		polygon.scale += t;
		translateX += t2;
		translateY += t3;
		polygon.translation.set(translateX,translateY);
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

		// comment
        switch(event.which) {
        	case 81:
        		console.log('q');
        		app.audioPlayer.play(loadedArray[2]);
        		drawPolygon(4);
        		break;

        	case 87:
        		console.log('w');
        		app.audioPlayer.play(loadedArray[3]);
        		drawPolygon(5);
        		break;
        	case 69:
        		console.log('e');
        		app.audioPlayer.play(loadedArray[4]);
        		drawPolygon(6);
        		break;
        	case 82:
        		console.log('r');
        		app.audioPlayer.play(loadedArray[5]);
        		drawPolygon(7);
        		break;
        	case 84:
        		console.log('t');
        		app.audioPlayer.play(loadedArray[6]);
        		drawPolygon(8);
        		break;
        	case 89:
        		console.log('y');
        		app.audioPlayer.play(loadedArray[0]);
        		drawPolygon(9);
        		break;
        	case 85:
        		console.log('u');
        		app.audioPlayer.play(loadedArray[1]);
        		drawPolygon(10);
        		break;
        }


		//playRandomNote(loadedArray);
		//drawRandomCircle();

	
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







