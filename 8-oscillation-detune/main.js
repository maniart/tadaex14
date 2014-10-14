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

// window width
var width = window.innerWidth;

// window height
var height = window.innerHeight;

// dividing the width of screen by four to define regions
var quarter = width / 4;

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
	

});

// define the type of wave based on mouse potiion on the screen
document.addEventListener('mousemove', function(event) {
	
	console.log(event);
	if(event.x < quarter) {
		oscillator.type = 'sine';
		currentClass = '.sine';
	} else if(event.x > quarter && event.x < quarter * 2) {
		oscillator.type = 'square';
		currentClass = '.square';
	} else if(event.x > quarter * 2 && event.x < quarter * 3) {
		oscillator.type = 'triangle';
		currentClass = '.triangle';
	} else {
		oscillator.type = 'sawtooth';
		currentClass = '.sawtooth';
	}

	oscillator.detune.value = Math.pow(2, 1/12) * app.utils.map(event.y, 0, height, 0, 1000);
	document.querySelector(currentClass).style.opacity = app.utils.map(event.y, 0, height, 0, 1);
});

