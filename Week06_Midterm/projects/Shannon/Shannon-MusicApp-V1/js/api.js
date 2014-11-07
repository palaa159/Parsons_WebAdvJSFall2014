// URL: http://ws.audioscrobbler.com/2.0/?method=chart.gethypedtracks&api_key=bb18eb8514314147cbf34855f7907902&format=json
// API Key: bb18eb8514314147cbf34855f7907902
// Secret: is 543d0d7498ea8a4d94a377f3f637ce5b

var app = app || {};

$(document).ready(function() {
    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=chart.getHypedTracks&api_key=bb18eb8514314147cbf34855f7907902&limit=20&format=json&callback=?", function(json) {
        var html = '';
        $.each(json.tracks.track, function(i, item) {

         
            html += "<p>" + "<div id='songname'>" + "<span style='margin:5%;'>" + item.name + "</span>"; 

            html += "<br>" + "<div id='artistname'>" + "<span style='margin:5%;'>" + "<a href=" + item.artist.url + " target='_blank'>" + item.artist.name + "</a>" + "</span>";

            if(item.image!=null){
             html+= "<p>" + "<div id='coverart'>" + "<span style='margin:5%;'>" + "<img src="+item.image[3]['#text']+">" + "</span>";
            }
            else {
             html+= "<p>" + "<div id='nocoverart'>" + "<span style='margin:5%;''>" + "<img src="+"http://i.imgur.com/LoD7Vh1.jpg"+ ">" + "</span>";
            };            

    //      //give each button an ID
  	// 		html += "<button class=" + "add-button" + " id=" + "songid" + ">" + "<span style='font-size:20px;padding:3px;'>" + "+" + "</span>" +"</button>";
        
  	// 		//create an array to save the html ID of those buttons
			// var songIDs = ["something", "something", "something"];
			// document.getElementById("playlist").innerHTML = songIDs;

        });

	// fake shit



			document.getElementById("song1").onclick = function(){displaySong1()};

			function displaySong1() {
		    document.getElementById("div1").innerHTML =  "<br>" + "Dear Future Husband" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Meghan Trainor" + "<br>" + "<img src="+"images/meghantrainor.png"+ ">";
			}


      document.getElementById("song2").onclick = function(){displaySong2()};

      function displaySong2() {
        document.getElementById("div2").innerHTML =  "<br>" + "Diamond Light Pt. 1" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Tweedy" + "</span>" + "<br>" + "<img src="+"images/tweedy.png"+ ">";
      }

      document.getElementById("song3").onclick = function(){displaySong3()};

      function displaySong3() {
        document.getElementById("div3").innerHTML =  "<br>" + "Love Ain't Enough" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "The Barr Brothers" + "</span>" + "<br>" + "<img src=" + "images/thebarrbrothers.jpg"+ ">";
      }

      document.getElementById("song4").onclick = function(){displaySong4()};

      function displaySong4() {
        document.getElementById("div4").innerHTML =  "<br>" + "Low Key" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Tweedy" + "</span>" + "<br>" + "<img src="+"images/tweedy.png"+ ">";
      }

     document.getElementById("song5").onclick = function(){displaySong5()};

      function displaySong5() {
        document.getElementById("div5").innerHTML =  "<br>" + "Kiss Me Again" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "The Drums" + "</span>" + "<br>" + "<img src="+"images/thedrums.png"+ ">";
      }

     document.getElementById("song6").onclick = function(){displaySong6()};

      function displaySong6() {
        document.getElementById("div6").innerHTML =  "<br>" + "Georgia" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Vance Joy" + "</span>" + "<br>" + "<img src="+"images/vancejoy.png"+ ">";
      }

     document.getElementById("song7").onclick = function(){displaySong7()};

      function displaySong7() {
        document.getElementById("div7").innerHTML =  "<br>" + "What Are You Waiting For" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Nickelback" + "</span>" + "<br>" + "<img src="+"http://i.imgur.com/LoD7Vh1.jpg"+ ">";
      }

     document.getElementById("song8").onclick = function(){displaySong8()};

      function displaySong8() {
        document.getElementById("div8").innerHTML =  "<br>" + "The Blasphemous Psalm To The Dummy God Creation" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Decapitated" + "</span>" + "<br>" + "<img src="+"images/decapitated.png"+ ">";
      }

      document.getElementById("song9").onclick = function(){displaySong9()};

      function displaySong9() {
        document.getElementById("div9").innerHTML =  "<br>" + "No Type" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Rae Sremmurd" + "</span>" + "<br>" + "<img src="+"images/raesremmurd.jpg"+ ">";
      }

     document.getElementById("song10").onclick = function(){displaySong10()};

      function displaySong10() {
        document.getElementById("div10").innerHTML =  "<br>" + "Willst Du - Radio Mix" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Robin Schulz" + "</span>" + "<br>" + "<img src="+"http://i.imgur.com/LoD7Vh1.jpg"+ ">";
      }


     document.getElementById("song11").onclick = function(){displaySong11()};

      function displaySong11() {
        document.getElementById("div11").innerHTML =  "<br>" + "Cool Kid" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "The Eeries" + "</span>" + "<br>" + "<img src="+"http://i.imgur.com/LoD7Vh1.jpg"+ ">";
      }


     document.getElementById("song12").onclick = function(){displaySong12()};

      function displaySong12() {
        document.getElementById("div12").innerHTML =  "<br>" + "Sentimentalist" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Sondre Lerche" + "</span>" + "<br>" + "<img src="+"http://i.imgur.com/LoD7Vh1.jpg"+ ">";
      }

     document.getElementById("song13").onclick = function(){displaySong13()};

      function displaySong13() {
        document.getElementById("div13").innerHTML =  "<br>" + "She Came Through (Again)" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Los Angeles Police Department" + "</span>" + "<br>" + "<img src="+"http://i.imgur.com/LoD7Vh1.jpg"+ ">";
      }

      document.getElementById("song14").onclick = function(){displaySong14()};

      function displaySong14() {
        document.getElementById("div14").innerHTML =  "<br>" + "Love Ballad" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Tove Lo" + "</span>" + "<br>" + "<img src="+"http://i.imgur.com/LoD7Vh1.jpg"+ ">";
      }

      document.getElementById("song15").onclick = function(){displaySong15()};

      function displaySong15() {
        document.getElementById("div15").innerHTML =  "<br>" + "Elevation" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Erasure" + "</span>" + "<br>" + "<img src="+"images/erasure.png"+ ">";
      }

      document.getElementById("song16").onclick = function(){displaySong16()};

      function displaySong16() {
        document.getElementById("div16").innerHTML =  "<br>" + "I Can't Describe (The Way I Feel)" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Jennifer Hudson" + "</span>" + "<br>" + "<img src="+"http://i.imgur.com/LoD7Vh1.jpg"+ ">";
      }

      document.getElementById("song17").onclick = function(){displaySong17()};

      function displaySong17() {
        document.getElementById("div17").innerHTML =  "<br>" + "I Can't Give You Anything But Love" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Tony Bennett" + "</span>" + "<br>" + "<img src="+"images/tonnybennett.png"+ ">";
      }

      document.getElementById("song18").onclick = function(){displaySong18()};

      function displaySong18() {
        document.getElementById("div18").innerHTML =  "<br>" + "Sex" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Lenny Kravitz" + "</span>" + "<br>" + "<img src=" + "images/lennykravitz.jpg"+ ">";
      }

      document.getElementById("song19").onclick = function(){displaySong19()};

      function displaySong19() {
        document.getElementById("div19").innerHTML =  "<br>" + "King of Errors" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Evergrey" + "</span>" + "<br>" + "<img src=" + "images/evergrey.png"+ ">";
      }

      document.getElementById("song20").onclick = function(){displaySong20()};

      function displaySong20() {
        document.getElementById("div20").innerHTML =  "<br>" + "Hasta Que Sangren" + "<br>" + "<a href=" + "http://i.imgur.com/LoD7Vh1.jpg" + " target='_blank'>" + "Supersubmarina" + "</span>" + "<br>" + "<img src=" + "http://i.imgur.com/LoD7Vh1.jpg"+ ">";
      }

	// end of fake shit

        $('#result').append(html);


    });

});



// app.api = (function() {
// 	var storage = {
// 		load: function() {
// 			if(localStorage['giffig'] === undefined) {
// 				localStorage['giffig'] = '[]';
// 			}
// 			app.main.user.fav = JSON.parse(localStorage.getItem('giffig'));
// 		},
// 		update: function() {
// 			localStorage['giffig'] = JSON.stringify(app.main.user.fav);
// 		}
// 	};





	