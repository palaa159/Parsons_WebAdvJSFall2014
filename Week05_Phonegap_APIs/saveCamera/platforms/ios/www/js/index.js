var app = app || {};

app.main = (function() {
    var photos = []; // keep all photos here
    // it looks like
    /*
        {
            type: 'image',
            content: '32uhfishf',
            timestamp: 14342643260
        },
        ...
    */
    var init = function() {
        // alert('app init');
        console.log('app init');

        // init localStorage
        // if lS is empty, we will give it empty array
        if (localStorage.length === 0) {
            localStorage.setItem('app', '[]');
            // of localStorage.setItem('app', '[]')
        } else {
            app.main.photos = JSON.parse(localStorage.getItem('app'));
        }
        console.log('--> SPOT 1');
        console.log(JSON.stringify(photos));
        // render stored content
        renderStoredContent();
        attachEvents();
        console.log('--> SPOT 2');
    };

    var renderStoredContent = function() {
        photos.forEach(function(item) {
            var img = $('<img>');
            img.attr({
                src: 'data:image/jpeg;base64,' +  item.content
            });
            // append to container
            $('#container').append(img);
        });
    };

    var attachEvents = function() {
        $('#btnCamera')
            .off('tap')
            .on('tap', function() {
                // alert('taking photo');
                takePhoto();
            });
        $('#btnClearStorage')
            .off('tap')
            .on('tap', function() {
                localStorage.clear();
                alert('reload your app now!');
            });
    };

    var takePhoto = function() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            targetWidth: 100,
            targetHeight: 100,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            // console.log(imageData);
            var img = $('<img>');
            img.attr({
                src: 'data:image/jpeg;base64,' +  imageData
            });
            // append to container
            $('#container').append(img);
            // save to localStorage
            var dataToAdd = {
                type: 'image',
                content: imageData,
                timestamp: new Date().getTime()
            };
            photos.unshift(dataToAdd);
            //
            console.log(JSON.stringify(photos));
            // update localStorage
            localStorage.setItem('app', JSON.stringify(photos));
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };

    return {
        init: init,
        photos: photos
    };
})();

$(document).on('deviceready', app.main.init);