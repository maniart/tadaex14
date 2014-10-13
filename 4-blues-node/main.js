/**
* comment here
*/


// comment
var two = new Two({ fullscreen: true }).appendTo(document.body);

var group = two.makeGroup();

group.translation.set(two.width/2, two.height/2);


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
			var polygon = two.makePolygon(generatePoints(4, 300), false);
			polygon.addTo(group);
			break;
		case 'Eb':
			var polygon = two.makePolygon(generatePoints(5, 300), false);
			polygon.addTo(group);
			break;
		case 'F':
			var polygon = two.makePolygon(generatePoints(6, 300), false);
			polygon.addTo(group);
			break;
		case 'Gb':
			var polygon = two.makePolygon(generatePoints(7, 300), false);
			polygon.addTo(group);
			break;
		case 'G':
			var polygon = two.makePolygon(generatePoints(8, 300), false);
			polygon.addTo(group);
			break;
		case 'Bb':
			var polygon = two.makePolygon(generatePoints(9, 300), false);
			polygon.addTo(group);
			break;
		case 'C2':
			var polygon = two.makePolygon(generatePoints(10, 100), false);
			polygon.addTo(group);
			break;
	}
	
	
	polygon.fill = 'transparent';
	polygon.stroke = 'white';
	polygon.linewidth = 1;
	polygon.scale = 0;
	polygon.rotation = 0;
	polygon.opacity = 1;

	two.bind('update', function(frameCount) {
		
		var t = (1 - polygon.scale) * .125 * app.utils.random(10);
		polygon.scale += t;
		polygon.rotation += t * 10 * Math.PI;


	}).play();
};

// comment
app.events.audioLoaded.add(function(loadedArray) {
	
	// comment
	console.log('Loaded successfully: ', loadedArray);
	
	// comment
	document.addEventListener('mousemove', function(event) {
		
		var mouseGain = app.utils.map(event.x, 0, two.width, 0, 1);
		app.audioPlayer.gain.gain.value = mouseGain;

		var green = Math.ceil(app.utils.map(event.x, 0, two.width, 0, 255));
		var blue = Math.ceil(app.utils.map(event.y, 0, two.height, 0, 255));

		document.querySelector('body').style.backgroundColor = 'rgb(100,'+ green +','+ blue +')';
		
	});


	// comment
	document.addEventListener('keydown', function(event) {
		
		// comment
        if (event.metaKey || event.ctrlKey) {
          return;
        }

		// comment
        switch(event.which) {
        	case 81:
        		app.audioPlayer.play(loadedArray[0], 0, true);
        		drawPolygonForNote('C');
        		break;

        	case 87:
        		app.audioPlayer.play(loadedArray[1], 0, true);
        		drawPolygonForNote('Eb');
        		break;
        	case 69:
        		app.audioPlayer.play(loadedArray[2], 0, true);
        		drawPolygonForNote('F');
        		break;
        	case 82:
        		app.audioPlayer.play(loadedArray[3], 0, true);
        		drawPolygonForNote('Gb');
        		break;
        	case 84:
        		app.audioPlayer.play(loadedArray[4], 0, true);
        		drawPolygonForNote('G');
        		break;
        	case 89:
        		console.log('y');
        		app.audioPlayer.play(loadedArray[5], 0, true);
        		drawPolygonForNote('Bb');
        		break;
        	case 85:
        		console.log('u');
        		app.audioPlayer.play(loadedArray[6], 0, true);
        		drawPolygonForNote('C2');
        		break;
        }
	
		

	});

});

// comment
app.audioLoader.load([	
	'../assets/audio-samples/blues-keys/C.m4a',
	'../assets/audio-samples/blues-keys/Eb.m4a',
	'../assets/audio-samples/blues-keys/F.m4a',
	'../assets/audio-samples/blues-keys/Gb.m4a',
	'../assets/audio-samples/blues-keys/G.m4a',
	'../assets/audio-samples/blues-keys/Bb.m4a',
	'../assets/audio-samples/blues-keys/C2.m4a',
]);