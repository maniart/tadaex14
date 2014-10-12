/**
 * shim.js : check for webAudio API support, return the supported version
*/
;(function() {
	try {
		window.audioContext = window.audioContext || window.webkitAudioContext;
		console.log('Woohoo! This browser supports webAudio API.');
	} catch(e) {
		console.log('This browser does now support webAudio API. Sorry. ', e);
	}	
})();
