/* Your code starts here */
/*
	1. structure app
	2. create events (controllers)
    3. create Model/View
    4. render view
*/


var app = app || {};


app.main = (function() {
    var items = [];
    var itemToAdd = {};
    var weight = 50;
    var ifkg = true;
    var unit = 'KG';
    var displayWeight = weight+' '+unit;
	
    var attachEvents = function() { // Controllers
        // we keep all the events here
        $('#itemAddBtn')
            .off('click') // it's good to have this
        .on('click', addNewItem);

        $('#kgTolb')
        .off('click')
        .on('click',changkgTolb);
        // listening for keypress
        $(document)
            .off('keypress')
            .on('keypress', function(e) {
                // autofocus
                $('#itemInput').focus();
                if (e.which == 13) { // enter
                    addNewItem();
                }
            });
        // listener for fav
        // $('.itemFavorite')
        //     .off('click')
        //     .on('click', function() {
        //         var viewToFav = $(this).parent();
        //         items.forEach(function(v, i) {
        //             if (v.view.item[0] === viewToFav[0]) {
        //                 items[i].model.update(i);
        //             }
        //         });
        //     });
        // listener for delete
        $('.itemDelete')
            .off('click')
            .on('click', function() {
                var viewToDelete = $(this).parent();
                // compare
                // console.log(items[0].view.item[0]);
                // console.log(viewToDelete[0]);
                // find in items
                items.forEach(function(v, i) {
                    if (v.view.item[0] === viewToDelete[0]) {
                        // console.log(i);
                        // remove it
                        items[i].model.remove(i);
                    }
                });
            });
    };
    
    var changkgTolb = function()
    {
        ifkg = !ifkg;
        $('.myWeight').html(makeUnitChange(weight));
        $('.unit').html(unit);
        items = [];
        if (localStorage.length > 0) {
            for (var i = 0 ; i<localStorage.length; i ++)
            {
                var n = localStorage.key(i);
                var title = localStorage.getItem(n);
                new Model(title,n).add();
                render();
            }
        }
        
    };

    var makeUnitChange = function(_weight)
    {
        if (ifkg == false)
        {
            unit = 'lb';
            displayWeight = Math.round(_weight*2.2);
        }else
        {
            unit = 'kg';
            displayWeight = Math.round(_weight);
        }
        return displayWeight;
    };


    var addNewItem = function() {
        var title = weight.toString();//$('#itemInput').val();
        var date = new Date();
        var n = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()+'     '+((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()).toString();
        var m = date.getMonth()+1;
        console.log(m,n);
        // add new object
        
		new Model(title,n).add();
		// clear
		$('#itemInput').val('');
		// render
		render();
        
    };

    var render = function() {
        console.info('rendering');
        // clear
        $('#itemsContainer').empty();
        items.forEach(function(item, i) { // same things to for()
            // render view
            item.model.render(i);
        });
        attachEvents();
    };

    var Model = function(_title,_date) {
        this.item = {
            title: _title,
            n:_date,
            fav: false
        };
        this.add = function() {
            itemToAdd.model = this;
			
            // chain to view
            new View(this).add();
        };
        this.render = function(i) {
            items[i].view.render();
        };
        this.update = function(i) {
            this.item.fav = !this.item.fav;
            items[i].view.update();
        };
        this.remove = function(i) {
            items[i].view.remove();
            items.splice(i, 1);
        };
        return this;
    };

    var View = function(model) {
        this.item = null;

        this.add = function() {
			localStorage.setItem(model.item.n,model.item.title); 
            
            var item = $('<div></div>').addClass('item').hide(),
                // itemFav = $('<span>&#10084;</span>').addClass('itemFavorite').appendTo(item),
                
                itemTitle = $('<span></span>').addClass('itemTitle').html(makeUnitChange(model.item.title)+unit).appendTo(item),
				itemDate = $('<span></span>').addClass('itemDate').html(model.item.n).appendTo(item),
                itemDelete = $('<span>&times;</span>').addClass('itemDelete').appendTo(item);
            this.item = item;
            itemToAdd.view = this;
            // unshift
            items.unshift(itemToAdd);
            // clear
            itemToAdd = {};
			
        };
        this.update = function() {
            // toggle class
            this.item.children('.itemFavorite').toggleClass('fav');
        };
        this.render = function() {
            // render to itemsContainer
            $('#itemsContainer').append(this.item);
            this.item.fadeIn();
        };
        this.remove = function() {
            this.item.fadeOut();
			localStorage.removeItem(model.item.n);
        };
        return this;
    };
    // var data = JSON.parse(localStorage.getItem("weight"));
    // localStorage.setItem("weight", JSON.stringify(data));

    var init = function() {
        console.info('app init');
        // init existing items in case we have them
        // finally add events
		if (localStorage.length > 0) {
			for (var i = 0 ; i<localStorage.length; i ++)
			{
				var n = localStorage.key(i);
				var title = localStorage.getItem(n);
				new Model(title,n).add();
				render();
			}
		}
       
    };
    //mouse move to get a number
    var prev;
            
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
                              //make it move
                               // $('.myWeight')[0].style.position="absolute";
                               // $('.myWeight')[0].style.top=e.pageY+'px';
            
           $('.myWeight').html(makeUnitChange(weight));
           $('.unit').html(unit);
           //$('.Date').html(m+n);
        }
    });

    return {
        init: init,
        items: items
    };
})();

$(window).on('load', app.main.init);