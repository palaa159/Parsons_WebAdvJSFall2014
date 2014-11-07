/* Your code starts here */

var app = app || {};

app.main = (function() {
    var init = function() {
        // app starts running here
    };
    var route = function() {
        console.log('your hash has changed');

        // remove all pages
        $('.page').remove();

        // set up a condition for routing
        var pageName = window.location.hash;
        pageName = pageName.substring(1, pageName.length);
        // pageName will display without #

        if (pageName === 'home') {
            // render home page
            var template = $('#tpl-home').html();
            var compiled = _.template(template);

            // append to body
            $('body').append(compiled);
            // init weight dragging script
            var prev;
            var weight = 50;
            var isMouseDown = false;
            $(document).on('mousedown', function() {
                console.log('mouse down');
                isMouseDown = true;
            });
            $(document).on('mouseup', function() {
                console.log('mouse up');
                isMouseDown = false;
            });
            $(document).on('mousemove', function(e) {
                // console.log('mouse moving!');
                // console.log(e.pageY);
                if (isMouseDown === true) {
                    var current = e.pageY;
                    if (current > prev) {
                        console.log('moving downward');
                        weight--;
                    } else {
                        console.log('upward');
                        weight++;

                    }
                    prev = current;
                    $('.myWeight').html(weight);
                }
            });


        } else if (pageName === 'about') {
            // render about page
            var template = $('#tpl-about').html();
            var compiled = _.template(template);

            // append to body
            $('body').append(compiled);
        } else if (pageName === 'contact') {
            // render contact
            var template = $('#tpl-contact').html();
            var compiled = _.template(template);

            // append to body
            $('body').append(compiled);
        }
    };
    return {
        init: init,
        route: route
    };
})();

$(window).on('hashchange', app.main.route);
$(window).on('load', app.main.init);