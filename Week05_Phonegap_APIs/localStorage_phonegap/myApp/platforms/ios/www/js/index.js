var init = function() {
    //

    // alert('hey');
    // var photoBtn = $('#photoButton');
    var image = document.getElementById('myImage');
    var photoBtn = document.getElementById('photoButton');
    photoBtn.addEventListener('click', takePhoto);

    var prevImage = localStorage.getItem('image');
    image.src = "data:image/jpeg;base64," + prevImage;

    function takePhoto() {

        photoBtn.innerHTML = 'Taking .....';

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var a = JSON.stringify(imageData);
            localStorage.setItem('image', a);
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
};

document.addEventListener('deviceready', init);