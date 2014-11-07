var app = app || {};

app.main = (function(){
	var items = [];
	var itemToAdd={};

<!--controller-->
	var attachEvents=function(){
		$('#itemAddBtn')
            .off('click') 
        	.on('click', addNewItem);

        $(document)
            .off('keypress')
            .on('keypress', function(e) {
                $('#itemInput').focus();
                    addNewItem(); 
            });

	};
	var addNewItem=function(){
		var title = $('#itemInput').val();
		new Model(title, false).add();
		$('#itemInput').val('');
		render();
        attachEvents();

	};
	var render=function(){
		// console.info('rending the message');

	};
<!--model-->
	var Model=function(_title,_fav){
		this.item={
			title:_title,
			fav:_fav
		};
		this.add=function(){
			itemToAdd.model=this;
			new View(this).add();

		};

	};
<!--view-->
	var View=function(model){
		this.item=null;
		this.add=function(){
			console.log('view add function');
		};

	};
<!--localstorage-->
	var storage={

	};
<!--init-->
	var init = function(){
		// console.info('herer is the ting you are looking for');
		render();
        attachEvents();

	};

	return{
		init:init,
		items:items

	};

})();

$(window).on('load', app.main.init);