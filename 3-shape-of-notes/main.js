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
//two.scene.translation.set(two.width/2, two.height/2);

// comment
var C = two.makeGroup();
var D = two.makeGroup();
var E = two.makeGroup();
var F = two.makeGroup();
var G = two.makeGroup();
var A = two.makeGroup();
var B = two.makeGroup();

C.translation.set(two.width / 7 - two.width / 14, two.height /2 );
D.translation.set((two.width / 7) * 2 - two.width / 14, two.height /2 );
E.translation.set((two.width / 7) * 3 - two.width / 14, two.height /2 );
F.translation.set((two.width / 7) * 4 - two.width / 14, two.height /2 );
G.translation.set((two.width / 7) * 5 - two.width / 14, two.height /2 );
A.translation.set((two.width / 7) * 6 - two.width / 14, two.height /2 );
B.translation.set(two.width - two.width / 14, two.height /2 );


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
var drawPolygonForNote = function(note) {

	switch(note) {
		case 'C':
			var polygon = two.makePolygon(generatePoints(4, 4), false);
			polygon.addTo(C);
			break;
		case 'D':
			var polygon = two.makePolygon(generatePoints(5, 4), false);
			polygon.addTo(D);
			break;
		case 'E':
			var polygon = two.makePolygon(generatePoints(6, 4), false);
			polygon.addTo(E);
			break;
		case 'F':
			var polygon = two.makePolygon(generatePoints(7, 4), false);
			polygon.addTo(F);
			break;
		case 'G':
			var polygon = two.makePolygon(generatePoints(8, 4), false);
			polygon.addTo(G);
			break;
		case 'A':
			var polygon = two.makePolygon(generatePoints(9, 4), false);
			polygon.addTo(A);
			break;
		case 'B':
			var polygon = two.makePolygon(generatePoints(10, 4), false);
			polygon.addTo(B);
			break;
	}
	
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
        		app.audioPlayer.play(loadedArray[2]);
        		drawPolygonForNote('C');
        		break;

        	case 87:
        		app.audioPlayer.play(loadedArray[3]);
        		drawPolygonForNote('D');
        		break;
        	case 69:
        		app.audioPlayer.play(loadedArray[4]);
        		drawPolygonForNote('E');
        		break;
        	case 82:
        		app.audioPlayer.play(loadedArray[5]);
        		drawPolygonForNote('F');
        		break;
        	case 84:
        		app.audioPlayer.play(loadedArray[6]);
				drawPolygonForNote('G');        		
        		break;
        	case 89:
        		console.log('y');
        		app.audioPlayer.play(loadedArray[0]);
        		drawPolygonForNote('A');
        		break;
        	case 85:
        		console.log('u');
        		app.audioPlayer.play(loadedArray[1]);
        		drawPolygonForNote('B');
        		break;
        }
	
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







