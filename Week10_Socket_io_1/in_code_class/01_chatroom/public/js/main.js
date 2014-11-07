/* Your code starts here */

var app = app || {};

app.main = (function() {
    var socket;
    var init = function() {
        // app starts running here

        // connect to socket server
        socket = io.connect();
        // listen for global server message
        socket.on('global message', function(data) {
            $('#server-message #output').html(data);
        });

        attachEvents();
    };

    var attachEvents = function() {
        // when submit
        $('#submit').on('click', function() {
            var chat_msg = $('#input-msg').val();
            socket.emit('chat msg', chat_msg);
            $('#input-msg').val('');
        });

        // listen for server messages
        socket.on('from clients', function(data) {
            var el = '<div class="chat-log">' + data.msg + '<span class="small">' + data.user + '</span></div>';
            $('#col-chatlog').append(el);
        });
    };

    return {
        init: init
    };
})();

app.main.init();