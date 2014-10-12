/**
 * comment here
*/

// comment
var app = app || {};

// comment
app.keys = (function() {

    // comment
    var index;

    // comment
    document.addEventListener('keydown', function(event) {

        // comment
        if (event.metaKey || event.ctrlKey) {
          return;
        }

        // comment
        var code = event.which;

        // comment
        event.preventDefault();

        switch (code) {

          // Q - P
            case 81:
                index = '0,0';
                break;
            case 87:
                index = '0,1';
                break;
            case 69:
                index = '0,2';
                break;
            case 82:
                index = '0,3';
                break;
            case 84:
                index = '0,4';
                break;
            case 89:
                index = '0,5';
                break;
            case 85:
                index = '0,6';
                break;
            case 73:
                index = '0,7';
                break;
            case 79:
                index = '0,8';
                break;
            case 80:
                index = '0,9';
                break;

            // A - L
            case 65:
                index = '1,0';
                break;
            case 83:
                index = '1,1';
                break;
            case 68:
                index = '1,2';
                break;
            case 70:
                index = '1,3';
                break;
            case 71:
                index = '1,4';
                break;
            case 72:
                index = '1,5';
                break;
            case 74:
                index = '1,6';
                break;
            case 75:
                index = '1,7';
                break;
            case 76:
                index = '1,8';
                break;

            // Z - M
            case 90:
                index = '2,0';
                break;
            case 88:
                index = '2,1';
                break;
            case 67:
                index = '2,2';
                break;
            case 86:
                index = '2,3';
                break;
            case 66:
                index = '2,4';
                break;
            case 78:
                index = '2,5';
                break;
            case 77:
                index = '2,6';
                break;
      
            // SPACE
            case 32:
                index = '3,0';
                break;

        }

        console.log(index);
        app.audioLoader.load('samples/Yamaha-SY-35-Clarinet-C5.wav');
        
    });

    

})();
