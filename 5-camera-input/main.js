var app = app || {};

app.main = (function(w, d) {

	'use strict';
	

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
		
		polygon.stroke = 'white';
		polygon.fill = 'transparent';

		polygon.linewidth = 1;
		polygon.translation.set(translateX, translateY);
		polygon.scale = 0;
		two.bind('update', function(frameCount) {
			var t = (10 - polygon.scale) * .125 * app.utils.random(10);
			var t2 = (1 - translateX) * .0125 * app.utils.random(10);
			var t3 = (1 - translateY) * .0125 * app.utils.random(10);
			polygon.scale += t;
			translateX += t2;
			translateY += t3;
			polygon.translation.set(translateX,translateY);
		}).play();
	};

	var loadedNotes;

	// comment
	app.events.audioLoaded.add(function(loadedArray) {
		
		// comment
		console.log('Loaded successfully: ', loadedArray);
		loadedNotes = loadedArray; // make notes available
		// comment
		document.addEventListener('keydown', function(event) {
			
			// comment
	        if (event.metaKey || event.ctrlKey) {
	          return;
	        }

			// comment
	        switch(event.which) {
	        	case 81:
	        		app.audioPlayer.play(loadedArray[2], 0);
	        		drawPolygonForNote('C');
	        		break;

	        	case 87:
	        		app.audioPlayer.play(loadedArray[3], 0);
	        		drawPolygonForNote('D');
	        		break;
	        	case 69:
	        		app.audioPlayer.play(loadedArray[4], 0);
	        		drawPolygonForNote('E');
	        		break;
	        	case 82:
	        		app.audioPlayer.play(loadedArray[5], 0);
	        		drawPolygonForNote('F');
	        		break;
	        	case 84:
	        		app.audioPlayer.play(loadedArray[6], 0);
					drawPolygonForNote('G');        		
	        		break;
	        	case 89:
	        		console.log('y');
	        		app.audioPlayer.play(loadedArray[0], 0);
	        		drawPolygonForNote('A');
	        		break;
	        	case 85:
	        		console.log('u');
	        		app.audioPlayer.play(loadedArray[1], 0);
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

	// cache dom elements
	var DOM = {};
		DOM.body = d.querySelector('body');
		DOM.webcam = d.querySelector('#webcam');
		DOM.canvas = d.querySelector('#canvas');
		DOM.normalImage = d.querySelector('#normal-image');
		DOM.diffImage = d.querySelector('#diff-image');

		// contexts, diff-image related vars
	var canvasCtx = DOM.canvas.getContext('2d'),
		normalImageCtx = DOM.normalImage.getContext('2d'),  
		diffImageCtx = DOM.diffImage.getContext('2d'), 
		
		timeOut,
		lastImageData,
		c = 5,
	
		// CONST
		W = w.innerWidth,
		H = w.innerHeight;
	
	// Setting up the stage
	DOM.canvas.width = W;
	DOM.canvas.height = H;
	canvasCtx.fillStyle = 'rgba(0,0,0,1)';
	canvasCtx.fillRect(0, 0, W, H);

		// Booleans
	var isHit = {};
		isHit.zibast = false;

	
	

	// Loop function
	function loop() {
		//drawAreasToBeChecked();
		//console.log('is hit zibast: ', zibast.isHit);
		drawVideo();
		blend();
		checkAreas();
		requestAnimFrame(loop);
	
	};


	// Initialize everything
	function init() {
		mirrorVideo();
		initCapture();
		loop();

	};

	/* BEGIN image processing stuff */

	// mirror video input
	function mirrorVideo() {
		normalImageCtx.translate(DOM.normalImage.width, 0);
		normalImageCtx.scale(-1, 1);
	};

	// webcam error report
	function webcamError(e) {
		alert('Webcam error!', e);
	};

	// init capture
	function initCapture() {
		if (navigator.getUserMedia) {
			navigator.getUserMedia({audio: false, video: true}, function(stream) {
				DOM.webcam.src = stream;
			}, webcamError);
		} else if (navigator.webkitGetUserMedia) {
			navigator.webkitGetUserMedia({audio:false, video:true}, function(stream) {
				DOM.webcam.src = window.webkitURL.createObjectURL(stream);
			}, webcamError);
		} else {
			//video.src = 'somevideo.webm'; // fallback.
		}
	};
	
	// draw the contents of video capture into a canvas#normal-image
	function drawVideo() {
		normalImageCtx.drawImage(DOM.webcam, 0, 0, DOM.webcam.width, DOM.webcam.height);
	};

	function blend() {
		var width = DOM.normalImage.width,
			height = DOM.normalImage.height,
		// get webcam image data
			sourceData = normalImageCtx.getImageData(0, 0, width, height);
		// create an image if the previous image doesnâ€™t exist
		if (!lastImageData) lastImageData = normalImageCtx.getImageData(0, 0, width, height);
		// create a ImageData instance to receive the blended result
		var blendedData = normalImageCtx.createImageData(width, height);
		// blend the 2 images
		differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
		// draw the result in a canvas
		diffImageCtx.putImageData(blendedData, 0, 0);
		// store the current webcam image
		lastImageData = sourceData;
	};

	function fastAbs(value) {
		// funky bitwise, equal Math.abs
		return (value ^ (value >> 31)) - (value >> 31);
	};

	function threshold(value) {
		return (value > 0x15) ? 0xFF : 0;
	};

	function difference(target, data1, data2) {
		// blend mode difference
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			target[4*i] = data1[4*i] == 0 ? 0 : fastAbs(data1[4*i] - data2[4*i]);
			target[4*i+1] = data1[4*i+1] == 0 ? 0 : fastAbs(data1[4*i+1] - data2[4*i+1]);
			target[4*i+2] = data1[4*i+2] == 0 ? 0 : fastAbs(data1[4*i+2] - data2[4*i+2]);
			target[4*i+3] = 0xFF;
			++i;
		}
	};

	function differenceAccuracy(target, data1, data2) {
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 2.5;
			var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 2.5;
			var diff = threshold(fastAbs(average1 - average2));
			target[4*i] = diff;
			target[4*i+1] = diff;
			target[4*i+2] = diff;
			target[4*i+3] = 0xFF;
			++i;
		}
	};

	function drawAreasToBeChecked() {	
		for (var r=1; r<6; ++r) {
			canvasCtx.fillRect(1/7*r*canvas.width, 1/8*3*webcam.height, canvas.width/8, 1/7*webcam.height);	
			canvasCtx.fill();
		}
	};

	// are we hitting the designated areas?
	function checkAreas() {
		// loop over the note areas
		for (var r=1; r<6; ++r) {
			//var blendedData = diffImageCtx.getImageData(1/8*r*webcam.width, 1/8*r*webcam.height, webcam.width/8, 1/8*webcam.height);
			var blendedData = diffImageCtx.getImageData(1/7*r*webcam.width, 1/8*3*webcam.height, webcam.width/8, 1/7*webcam.height);
			var i = 0;
			var average = 0;
			// loop over the pixels
			while (i < (blendedData.data.length * 0.25)) {
				// make an average between the color channel
				average += (blendedData.data[i*4] + blendedData.data[i*4+1] + blendedData.data[i*4+2]) / 3;
				++i;
			}
			// calculate an average between of the color values of the note area
			average = Math.round(average / (blendedData.data.length * 0.25));
			if (average > 10) {
				// over a small limit, consider that a movement is detected
				// play a note and show a visual feedback to the user
				//playSound(notes[r]);
//				notes[r].visual.show();
//				notes[r].visual.fadeOut();
				//if(!notes[r].visual.is(':animated')) {
				//	notes[r].visual.css({opacity:1});
				//	notes[r].visual.animate({opacity:0}, 700);
				//}
				console.log('hit: ' + r);
				switch(r) {
					case 1:
						console.log('1');
						app.audioPlayer.play(loadedNotes[2], 0);
	        			drawPolygonForNote('C');
					break;
					case 2:
						console.log('2');
						app.audioPlayer.play(loadedNotes[3], 0);
	        			drawPolygonForNote('D');
					break;
					case 3: 
						console.log('3');
						app.audioPlayer.play(loadedNotes[4], 0);
	        			drawPolygonForNote('E');
					break;
					case 4:
						console.log('4');
						app.audioPlayer.play(loadedNotes[5], 0);
	        			drawPolygonForNote('F');
					break;
					case 5:
						console.log('5');
						app.audioPlayer.play(loadedNotes[6], 0);
	        			drawPolygonForNote('G');
						break;
						
				}
				
			} else {
				switch(r) {
					case 1:

					break;
					case 2:

					break;
					case 3: 

					break;
					case 4:

					break;
					case 5:

					break;
						
				}
			}
		}
	}
	

	// RequestAnimFrame: a browser API for getting smooth animations
	window.requestAnimFrame = (function(){
  	return  window.requestAnimationFrame       || 
		  	window.webkitRequestAnimationFrame || 
		  	window.mozRequestAnimationFrame    || 
		  	window.oRequestAnimationFrame      || 
		  	window.msRequestAnimationFrame     ||  
		  	function( callback ){
				window.setTimeout(callback, 1000 / 60);
		  	};
	})();
     


	// Mouse events
	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x : evt.clientX - rect.left,
			y : evt.clientY - rect.top
		};
	};
	

	// Module API
	return {
		init : init
	};

})(window, document);

// Initialize app on window load
window.onload = app.main.init;
