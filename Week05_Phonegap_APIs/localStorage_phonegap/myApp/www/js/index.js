var init = function() {
    //

    // alert('hey');
    // var photoBtn = $('#photoButton');
    var image = document.getElementById('myImage');
    var photoBtn = document.getElementById('photoButton');
    photoBtn.addEventListener('click', takePhoto);

    var prevImage = localStorage.getItem('image');
    // console.log(window.btoa(prevImage));
    image.src = "data:image/jpeg;base64," + window.btoa(prevImage);

    function takePhoto() {

        photoBtn.innerHTML = 'Taking .....';

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 1,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            // console.log(imageData);
            image.src = "data:image/jpeg;base64," + imageData;
            var a = window.atob(imageData);
            localStorage.setItem('image', a);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
};

document.addEventListener('deviceready', init);