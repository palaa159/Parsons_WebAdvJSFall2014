var init = function() {


    var image = document.getElementById('myImage');
    var photoBtn = document.getElementById('tab-photo');
    photoBtn.addEventListener('click', takePhoto);

    var prevImage = localStorage.getItem('image');
    // console.log(window.btoa(prevImage));
    image.src = "data:image/jpeg;base64," + window.btoa(prevImage);

    function takePhoto() {

        // photoBtn.innerHTML = 'Taking .....';

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            // destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            // console.log(imageData);
            var smallImage = document.getElementById('smallImage');

            // Unhide image elements//
            smallImage.style.display = 'block';

            smallImage.src = "data:image/jpeg;base64," + imageData;

            // image.src = "data:image/jpeg;base64," + imageData;
            var a = window.atob(imageData);
            localStorage.setItem('image', a);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
};

document.addEventListener('deviceready', init);
