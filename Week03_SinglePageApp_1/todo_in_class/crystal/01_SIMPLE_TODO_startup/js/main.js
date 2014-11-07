/* Your code starts here */
var app = app || {};
app.main = (function(){

	var items =[];

	/*
	items =[
	{model blag 
	view: blah
	},
	{
	model blah
	view blah
	}]
	*/

	var init = function (){
	console.log('app init');
	controller();
};

var controller = function() {
	$('#itemAddBtn').on('click', addNewItem);

};

var addNewItem = function(){
	var message = $('itemInput'.val)

// var message = document.getElementByID('iteminput).value')


	console.log('adding new item' + message);


	//create new model
new Model(message).create();

};
 var Model = function(title, like){
 	this.title = title;
 	this.like = like || false; //second argument false by default

 	this.create = function() {
 		items.unshift({
 			model: {
 				title: this.title,
 				like: this.like
 			}
 		});
 		//push goes last, unshift goes first
 		new View (this);

 	};

//skip read

this.render = function(){

};
this.update = function(){

};
this.remove = function(){


};
};

var View = function(model) {
this.model = model;
this.create = function() {
//create the represenation of our data 

var itemContainer= $('<div></div>').addClass('item');

var itemFav =$('<span>$#9825;</span>').addClass('itemFavorite');

var itemTitle =$('<span></span>').addClass('itemTitle').html(this.model);

var itemDelete =$('<span>$#10006;</span>').addClass('itemDelete');

//apending each of them into div class item div
itemFav.appendTo(itemContainer);

itemTitle.appendTo(itemContainer);

itemDelete.appendTo(itemContainer);

// itemContainer.appednTo($(#itemsContainer));
//apending each of them into div class itemContainer div
itemFav.appendTo(itemContainer);
$('#itemsContainer').append(itemContainer);

// itemContainer.append(itemFav);



//document.createElement 'div'
};
this.render = function() {

};

this.update = function() {

};

this.remove = function() {

};

};

 


return {
	init: init,
	items:items
};

}) (); 


$(document)on.('ready', app.main.init);















