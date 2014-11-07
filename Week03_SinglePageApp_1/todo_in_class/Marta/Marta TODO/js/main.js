/* Your code starts here */

var appp = app || {};

app.main = (function() {

	var items = [];
	/*

	items = [
	{

		model: blah blah,
		view: blah blah,	

	},

	{
	model: foo,
	view: bar,

	},

	]

	*/
	var init = function() {
		console.log('app init');
		controller();
	};
		
		var controller = function(){
			$('#itemAddBtn').on('click', addNewItem);

	};

	var addNewItem = function(){

		var  message = $('#itemInput').val();

		console.log('adding New' + message);

		new Model(message).create();
		
	};

	//create new model
	var Model = function(title, like){
		this.title = title;
		this.like = like || false;

		this.create = function(){
			items.unshift({

				model: {
					title: this.title,
					like: this.like
				}

			});
			//push last
			//unshift first(index)

		};

		//skip ready

		this.update = function(){

		};

		this.remove = function(){

		};

	};

	return{ 

		init : init,
		items : items
	};

})();

$(document).on('ready', app.main.init);







