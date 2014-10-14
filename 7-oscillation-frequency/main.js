// comment
var two = new Two({ fullscreen: true }).appendTo(document.body);

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
			var polygon = two.makePolygon(generatePoints(4, app.utils.random(100)), false);
			polygon.addTo(C);
			break;
		case 'D':
			var polygon = two.makePolygon(generatePoints(5, app.utils.random(100)), false);
			polygon.addTo(D);
			break;
		case 'E':
			var polygon = two.makePolygon(generatePoints(6, app.utils.random(100)), false);
			polygon.addTo(E);
			break;
		case 'F':
			var polygon = two.makePolygon(generatePoints(7, app.utils.random(100)), false);
			polygon.addTo(F);
			break;
		case 'G':
			var polygon = two.makePolygon(generatePoints(8, app.utils.random(100)), false);
			polygon.addTo(G);
			break;
		case 'A':
			var polygon = two.makePolygon(generatePoints(9, app.utils.random(100)), false);
			polygon.addTo(A);
			break;
		case 'B':
			var polygon = two.makePolygon(generatePoints(10, app.utils.random(100)), false);
			polygon.addTo(B);
			break;
	}
	
	var translateX = app.utils.random(two.width);
	var translateY = app.utils.random(two.height);
	polygon.fill = 'transparent';
	polygon.stroke = app.utils.randomColor();
	polygon.linewidth = 1;
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


// using the audio context, we cretae a new oscillator
var oscillator = app.context.createOscillator();

// oscillator types: sine (0), square (1), sawtooth (2), triangle (3) and custom (4)
oscillator.type = 'sine';

// setting the frequency of the wave
oscillator.frequency.value = 440;

if (!oscillator.start) {
	oscillator.start = source.noteOn;			
}

// setting the detune value
oscillator.detune.value = Math.pow(2, 1/12) * 10;

// connect the osciclator to context destination
oscillator.connect(app.context.destination);

//create a gain node
var gain = app.context.createGain();

// connect oscillator to gain node
oscillator.connect(gain);

// connect gain node to destination (speakers)
gain.connect(app.context.destination);

// turn off the volume in the beginning
gain.gain.value = -1;

// play the oscillator
oscillator.start(0);

// counting keypresses
var times = 0;

// changing the wave shape
var shape = 0;

// window width
var width = window.innerWidth;

// window height
var height = window.innerHeight;

// dividing the width of screen by four to define regions
var seventh = width / 7;

// current section
var currentClass;



// play the waveform when key pressed
document.addEventListener('keydown', function(event) {

	// q
	if(event.which === 81) {
		times ++;
		if(times %2) {
			gain.gain.value = 1;	
		} else {
			gain.gain.value = -1;
		}
	}

	// space
	if(event.which === 87) {
		shape ++;
		console.log('yo');
		switch(shape % 4) {
			case 0:
				oscillator.type = 'sine';
				document.querySelector('.shape').innerHTML = 'sine';
				break;
			case 1:
				oscillator.type = 'square';
				document.querySelector('.shape').innerHTML = 'square';
				break;
			case 2:
				oscillator.type = 'triangle';
				document.querySelector('.shape').innerHTML = 'triangle';
				break;
			case 3:
				oscillator.type = 'sawtooth';
				document.querySelector('.shape').innerHTML = 'sawtooth';
		}
	}
	

});

// define the type of wave based on mouse potiion on the screen
document.addEventListener('mousemove', function(event) {
	
	console.log(event);
	if(event.x < seventh) {
		oscillator.frequency.value = 523.25;
		drawPolygonForNote('C');
	} else if(event.x > seventh && event.x < seventh * 2) {
		oscillator.frequency.value = 587.33;
		drawPolygonForNote('D');
	} else if(event.x > seventh * 2 && event.x < seventh * 3) {
		oscillator.frequency.value = 659.25;
		drawPolygonForNote('E');
	} else if(event.x > seventh * 3 && event.x < seventh * 4) {
		oscillator.frequency.value = 698.46;
		drawPolygonForNote('F');
	} else if(event.x > seventh * 4 && event.x < seventh * 5) {
		oscillator.frequency.value = 783.99;
		drawPolygonForNote('G');
	} else if(event.x > seventh * 5 && event.x < seventh * 6) {
		oscillator.frequency.value = 880.00;
		drawPolygonForNote('A');
	} else if(event.x > seventh * 6) {
		oscillator.frequency.value = 987.77;
		drawPolygonForNote('B');
	
	}

});

