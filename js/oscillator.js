
console.log('sup homie');
var context = new AudioContext();
var oscillator = context.createOscillator();
oscillator.type = 2; // sine (0), square (1), sawtooth (2), triangle (3)
oscillator.frequency.value = 400; // hz
var gain = context.createGain();
gain.gain.value = .5;
oscillator.connect(gain);
gain.connect(context.destination);