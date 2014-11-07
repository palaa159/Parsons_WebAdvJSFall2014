var app = app || {};

app.pages = (function(){
	
	// a temp container for a page
    var pageToRender;
    
    // var hash = window.location.hash,
    // page = hash.substring(2, hash.length);


    var render ={

        myGardan: function() {
            console.log('rendering myGardan page');
            // update pageToRender
            app.pages.pageToRender = _.template($('#tpl-myGardan').html(), {
                // dummy: ['Apon', 'Dylan', 'Shufei', 'Alec'],
                // items: [],
                transition: 'slideIn'

            });
            transition();
            $("#header-plant").hide();
            $("#backTohome").hide();
        },
        
        newPlant: function() {
            console.log('rendering addNewPlant');
            app.pages.pageToRender = _.template($('#tpl-addNewPlant').html(), {
                // dummy: 'blah blah'
                // dummy: ['Apon', 'Dylan', 'Shufei', 'Alec']
                transition: 'slideInFromBottom'
            });
            overlay();
        // },

   //      newDiary: function() {
			// console.log('rendering addNewDiary');
			// app.pages.pageToRender = _.template($('#tpl-addNewDiary').html(), {

   //              transition: 'slideInFromBottom'
			// });
   //      	overlay();
        }
    };
    
    var transition = function() {
        // go advanced -> page transitioning
        // console.log($(app.pages.pageToRender))
        $('#view').append(app.pages.pageToRender);
        // $('#view').append(app.main.init.storage.load());
        setTimeout(function() {
            $('.page').removeClass('slideIn');
            $('.end').addClass('slideOut');
        }, 100);
    };

    var overlay = function() {
        $('body').append(app.pages.pageToRender);
        setTimeout(function() {
            $('.overlayer').removeClass('slideInFromBottom');
        }, 100);
    };

    return {
        render: render,
        pageToRender: pageToRender
    };

})();