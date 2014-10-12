/**
 * comment here
*/

// comment
var app = app || {};

// comment
app.BufferLoader = (function() {

    // comment
    function BufferLoader(context, urlList, callback) {
        // comment
        this.context = context;
        // comment
        this.urlList = urlList;
        // comment
        this.onload = callback;
        // comment
        this.bufferList = new Array();
        // comment
        this.loadCount = 0;
    }

    // comment
    BufferLoader.prototype.loadBuffer = function(url, index) {
        // Load buffer asynchronously
        var request = new XMLHttpRequest();
        // comment
        request.open("GET", url, true);
        // comment
        request.responseType = "arraybuffer";
        // comment
        var loader = this;
        // comment
        request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            // comment
            request.response,
            // comment
            function(buffer) {
                // comment
                if (!buffer) {
                    console.log('error decoding file data: ' + url);
                    return;
                }
                // comment
                loader.bufferList[index] = buffer;
                // comment
                if (++loader.loadCount == loader.urlList.length) {
                    // comment
                    loader.onload(loader.bufferList);    
                }
            },
            // comment
            function(error) {
                // comment
                console.error('decodeAudioData error', error);
            });
        }

        request.onerror = function() {
            console.log('BufferLoader: XHR error');
        }

        request.send();
    }

    // comment
    BufferLoader.prototype.load = function() {
        // comment
        for (var i = 0; i < this.urlList.length; ++i) {
            // comment
            this.loadBuffer(this.urlList[i], i);    
        }
        
    }

    return BufferLoader;

})();


