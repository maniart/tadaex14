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
gain.gain.value = 0;

// play the oscillator
oscillator.start(0);

// counting keypresses
var times = 0;

// play the waveform when key pressed
document.addEventListener('keydown', function(event) {

	times ++;
	if(times %2) {
		gain.gain.value = 1;	
	} else {
		gain.gain.value = -1;
	}
	

});

