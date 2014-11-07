var app = app || {};

app.pages = (function() {

    // a temp container for a page
    var pageToRender;

    // here is to render pages differently.
    var render = {
        home: function() {
            console.log('rendering home page');
            // update pageToRender
            app.pages.pageToRender = _.template($('#tpl-home').html(), {
                // dummy: 'blah blah'
                transition: 'slideIn',
                // forJsColor: 'color {required:false}'
                forJsColor: "color {minV:0.8}",
                // valueForJsColor: "66ff00"

            });
            
            transition();
            // app.main.storage.load();
        },
        story: function() {
            console.log('rendering story page');
            //load localstorage here

            var dummyForLocalstorage=[];//create a array for render.

            if (localStorage.length === 0) {
                    var blank = JSON.stringify([]);
                    localStorage.setItem('app', blank);
            } else {
                        // if already exist
                var lsItems = JSON.parse(localStorage.getItem('app'));
                    lsItems.forEach(function(v) {
                        dummyForLocalstorage.push(v.title);
                    });
            }

            console.log(dummyForLocalstorage);
            //..........

            app.pages.pageToRender = _.template($('#tpl-story').html(), {
                // dummy: ['Apon', 'Dylan', 'Shufei', 'Alec'],
                dummy:dummyForLocalstorage,
                transition: 'slideIn'
            });
            transition();
        },
        mood: function() {
            console.log('rendering mood page');
            var colorForLocalstorage=[];
            if (localStorage.length === 0) {
                    var blank = JSON.stringify([]);
                    localStorage.setItem('app', blank);
            } else {
                        // if already exist
                var lsItems = JSON.parse(localStorage.getItem('app'));
                    lsItems.forEach(function(v) {
                        // colorForLocalstorage.push(v.color);
                        if(v.color==1){
                            colorForLocalstorage.push('itemRed');
                        }else if(v.color ==2){
                            colorForLocalstorage.push('itemBlue');
                        }else if(v.color ==3){
                            colorForLocalstorage.push('itemGreen');
                        }
                    });
            }
            //logic here 
            //
            app.pages.pageToRender = _.template($('#tpl-mood').html(), {
                // dummy: 'blah blah'
                dummy: colorForLocalstorage,
                transition: 'slideIn'
            });
            transition();
        },
        // <!--here is not using-->
        // create: function() {
        //     console.log('rendering create');
        //     app.pages.pageToRender = _.template($('#tpl-create').html(), {
        //         // dummy: 'blah blah'
        //         // dummy: ['Apon', 'Dylan', 'Shufei', 'Alec']
        //         transition: 'slideInFromBottom'
        //     });
        //     overlay();
        // }
    };

    var transition = function() {
        // go advanced -> page transitioning
        // console.log($(app.pages.pageToRender))
        $('#view').append(app.pages.pageToRender);
        setTimeout(function() {
            $('.page').removeClass('slideIn');
            $('.end').addClass('slideOut');
        }, 10);
    };

    var storage = {
        load: function() {
                    // assume that user doesn't use IE8-
                if (localStorage.length === 0) {
                    var blank = JSON.stringify([]);
                    localStorage.setItem('app', blank);
                } else {
                        // if already exist
                    var lsItems = JSON.parse(localStorage.getItem('app'));
                    lsItems.forEach(function(v) {
                        new Model(v.title, v.fav,v.color).add();
                        render();
                        // console.log('----hi load'+v.title);
                    });
                }
                    // new Model(title, fav);
            },
            // save: function() {
            //     var itemsToSave = [];
            //     items.forEach(function(v) {
            //         itemsToSave.unshift({
            //             title: v.model.item.title,
            //             fav: v.model.item.fav
            //         });
            //     });
            //     localStorage.setItem('app', JSON.stringify(itemsToSave));////ASK
            // }
    };

// <!--here is not using-->
    // var overlay = function() {
    //     $('body').append(app.pages.pageToRender);
    //     setTimeout(function() {
    //         $('.overlayer').removeClass('slideInFromBottom');
    //     }, 100);
    // };

    return {
        render: render,
        pageToRender: pageToRender
    };
})();