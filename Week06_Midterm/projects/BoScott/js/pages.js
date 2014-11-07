var app = app || {};

// var optionOne = $(document).append("<div class='content-main'>")

//     </div>

//             <div class="content-main">
//         <div class="content-body">
//             <h2>Top artists</h2>
//             <div class="content-body-inner" id="top_artists"></div>
//         </div>
//         <div class="content-body">
//             <h2>Top artist</h2>
//             <div class="content-body-inner" id="top_artist"></div>
//         </div>
//         <div class="content-body">
//             <h2>Top tracks</h2>
//             <div class="content-body-inner" id="top_tracks"></div>
//         </div>

app.pages = (function() {

    // a temp container for a page
    var pageToRender;

//     var tag = $('#genre').val()

// var submitTag = function(){
//     $('#submit').click(function(e){
//         // e.preventDefault();
//         // setTag();
//         console.log('working');
//     });
       

// };
    // var last = {};
    // e.preventDefault();

    // here is to render pages differently.
    var render = {
        topArtists: function() {
            console.log('rendering in-progress page');
            // update pageToRender
            app.pages.pageToRender = _.template($('#tpl-inProgress').html(), {
                // dummy: 'blah blah'
                // dummy: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                transition: 'slideIn'
            });
            transition();



    
    $('#submit').click(function(e){
        e.preventDefault();
        // setTag();
        console.log('working');
    // });
    var tag = $('.genre').val()
    
    if(tag == null || tag == ''){
        alert('You need to put a genre!');
        return{
            render: render
        };
    };



        lastfm.tag.getWeeklyArtistChart({tag: tag, limit: 6}, {success: function(data){

        // render top weekly artist using 'lastfmTemplateArtists' template
        $('#top_artists').html(
            $('#lastfmTemplateArtists').render(data.weeklyartistchart.artist)
        );


        // define top artist name
        topArtistName = data.weeklyartistchart.artist[0].name;

        // load details of the artist
        lastfm.artist.getInfo({artist: topArtistName}, {success: function(data){

            // render the single artist info using 'lastfmTemplateArtistInfo' template
            $('#top_artist').html(
                $('#lastfmTemplateArtistInfo').render(data.artist)
            );
            $('#liked').on('click', function() {
                        console.log('liked');
                        $('.favContainer').append($('#artist').html());

                        // var storeName = $('#name').html();
                        // localStorage.first = storeName;

                        // $('.favContainer').html = localStorage.first;
                        localStorage.setItem('storeName', JSON.stringify($('#name').html()));

                        var storeName = JSON.parse(localStorage.getItem('storeName'));
                        $('.favContainer').append(storeName);
                    });

            

        }});

        topArtistName2 = data.weeklyartistchart.artist[1].name;

        // load details of the artist
        lastfm.artist.getInfo({artist: topArtistName2}, {success: function(data){

            // render the single artist info using 'lastfmTemplateArtistInfo' template
            $('#top_artist2').html(
                $('#lastfmTemplateArtistInfo2').render(data.artist)
            );
            $('#liked1').on('click', function() {
                        console.log('liked1');
                        $('.favContainer1').append($('#artist1').html());
                    });
        }});

        topArtistName3 = data.weeklyartistchart.artist[2].name;

        // load details of the artist
        lastfm.artist.getInfo({artist: topArtistName3}, {success: function(data){

            // render the single artist info using 'lastfmTemplateArtistInfo' template
            $('#top_artist3').html(
                $('#lastfmTemplateArtistInfo3').render(data.artist)
            );
            $('#liked2').on('click', function() {
                        console.log('liked2');
                        $('.favContainer2').append($('#artist2').html());
                    });
        }});

        topArtistName4 = data.weeklyartistchart.artist[3].name;

        // load details of the artist
        lastfm.artist.getInfo({artist: topArtistName4}, {success: function(data){

            // render the single artist info using 'lastfmTemplateArtistInfo' template
            $('#top_artist4').html(
                $('#lastfmTemplateArtistInfo4').render(data.artist)
            );
            $('#liked3').on('click', function() {
                        console.log('liked3');
                        $('.favContainer3').append($('#artist3').html());
                    });
        }});

        topArtistName5 = data.weeklyartistchart.artist[4].name;

        // load details of the artist
        lastfm.artist.getInfo({artist: topArtistName5}, {success: function(data){

            // render the single artist info using 'lastfmTemplateArtistInfo' template
            $('#top_artist5').html(
                $('#lastfmTemplateArtistInfo5').render(data.artist)
            );
            $('#liked4').on('click', function() {
                        console.log('liked4');
                        $('.favContainer4').append($('#artist4').html());
                    });
        }});

        topArtistName6 = data.weeklyartistchart.artist[5].name;

        // load details of the artist
        lastfm.artist.getInfo({artist: topArtistName6}, {success: function(data){

            // render the single artist info using 'lastfmTemplateArtistInfo' template
            $('#top_artist6').html(
                $('#lastfmTemplateArtistInfo6').render(data.artist)
            );
            $('#liked5').on('click', function() {
                        console.log('liked5');
                        $('.favContainer5').append($('#artist5').html());
                    });
        }});


            lastfm.artist.getTopTracks({artist: topArtistName, limit: 10}, {success: function(data){

                // render the tracks using 'lastfmTemplateTracks' template
                $('#top_tracks').html(
                    $('#lastfmTemplateTracks').render(data.toptracks.track)
                );
                console.log('getting music');
            }});

    }});
                    
});

    $('#tpl-inProgress').show();
    $('#tpl-done').show();
    $('#tpl-about').hide();

        },
        fav: function() {
            console.log('rendering done page');
            app.pages.pageToRender = _.template($('#tpl-done').html(), {
                // dummy: 'blah blah'
                // dummy: ['Apon', 'Dylan', 'Shufei', 'Alec']
                transition: 'slideIn'
            });
            transition();



    $('#tpl-inProgress').hide();
    $('#tpl-done').show();
    $('#tpl-about').hide();

    

        },
        about: function() {
            console.log('rendering about page');
            app.pages.pageToRender = _.template($('#tpl-about').html(), {
                // dummy: 'blah blah'
                // dummy: ['Apon', 'Dylan', 'Shufei', 'Alec']
                transition: 'slideIn'
            });
            transition();

    $('#tpl-inProgress').hide();
    $('#tpl-done').hide();
    $('#tpl-about').show();

        },
        // create: function() {
        //     console.log('rendering create');
        //     app.pages.pageToRender = _.template($('#tpl-create').html(), {
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
        }, 100);
    };

    // var overlay = function() {
    //     $('body').append(app.pages.pageToRender);
    //     setTimeout(function() {
    //         $('.overlayer').removeClass('slideInFromBottom');
    //     }, 100);
    // };

    ///////////////  API   //////////////////

    // define api keys
    var apiKey = 'b1a302ad3fb85a3ebca1fcc678addadf';
    var apiSecret = '72bad5b3ae1737120a35f5f240d3a777';
    // var longi = 
 
    // create a Cache object
    var cache = new LastFMCache();

    // create a LastFM object
    var lastfm = new LastFM({
        apiKey    : apiKey,
        apiSecret : apiSecret,
        cache     : cache
    });

    var topArtistName = '';

    // last.topMusic = 

//     var getMusic = function() {

//         topArtistsName = data.weeklyartistchart.artist[1].name;
//         lastfm.tag.getWeeklyArtistChart({tag: 'rock', limit: 6}, {success: function(data){
//             last.topMusic = data.data;
//         }});
// };
                

// var setTag = function(){
    
    
//     tag = $('.genre').val()
    
//     if(tag == null || tag == ''){
//         alert('You need to put a genre!');
//         return;
//     };
    
//     render();

// };

// // submitTag

// var submitTag = function(){
//     $('#submit').click(function(e){
//         e.preventDefault();
//         setTag();
//         console.log('working');
//     });
       

// };


/////////////
    // submitTag();


    //////////////// API end ////////////////

    return {
        render: render,
        pageToRender: pageToRender
    };




})();