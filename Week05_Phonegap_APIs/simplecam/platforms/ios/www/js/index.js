var app = app || {};

app.main = (function() {
    var init = function() {
        console.log('app init');
        attachEvents();
    };

    var attachEvents = function() {
        $('#btnGetCam').on('click', getCamera);
    };

    var getCamera = function() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 200,
            targetHeight: 200
        });

        function onSuccess(imageData) {
            getLocation();
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };

    var getLocation = function() {
        var onSuccess = function(position) {
            // alert('Latitude: ' + position.coords.latitude + '\n' +
            //     'Longitude: ' + position.coords.longitude + '\n' +
            //     'Altitude: ' + position.coords.altitude + '\n' +
            //     'Accuracy: ' + position.coords.accuracy + '\n' +
            //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            //     'Heading: ' + position.coords.heading + '\n' +
            //     'Speed: ' + position.coords.speed + '\n' +
            //     'Timestamp: ' + position.timestamp + '\n');
            
            var location = 'lat: ' + position.coords.latitude + ', lon: ' + position.coords.longitude;
            $('#myLocation').html(location);
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };

    return {
        init: init
    };
})();

// $(window).on('load', app.main.init);
$(document).on('deviceready', app.main.init); // --> super important