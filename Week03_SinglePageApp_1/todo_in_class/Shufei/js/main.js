/* Your code starts here */
var app = app||{};
app.main =(function(){

var items =[];



var init =function(){

console.log('app init');
controller();

};

var controller = function(){

$('#itemAddBtn').on('click', addNewItem);

$('.itemDelete').on('click', deleteItem);
};


var deleteItem = function(){

	var parent = $(this).parent();
	console.log(parent);
    items.forEach(){};


};

var addNewItem =function(){

	var message = $('#itemInput').val();
    console.log('adding new item' + message);
    new Model(message).create();
    controller();

};

var Model = function(title, like){

  this.title = title;
  this.like = like || false;
  this.create = function(){

   items.unshift({
   	model: this
   });

   new View(this).create();

  };
   
  this.render = function(){
  };

  this.update = function(){
  };
  
  this.remove= function(){
  };
};

  var View = function(model){
  
  this.model = model;

  this.create = function(){
   
   var itemContainer = $('<div></div>').addClass('item');
            // var itemContainer = document.createElement('div');
            var itemFav = $('<span>&#9825;</span>').addClass('itemFavorite');
            var itemTitle = $('<span></span>').addClass('itemTitle').html(this.model.title);
            var itemDelete = $('<span>&#10006;</span>').addClass('itemDelete');

            itemFav.appendTo(itemContainer);
            itemTitle.appendTo(itemContainer);
            itemDelete.appendTo(itemContainer);

            // itemContainer.appendTo('$')
          //  $('#itemsContainer').append(itemContainer);
        
   $('#itemContainer').prepend(itemContainer);
          
  };
   
   this.render = function(){

  	
  };

   this.update = function(){

  	
  };
   this.remove = function(){

  	
  };

}

return{

  init: init,
  items:items

};

})();


$(document).on('ready', app.main.init);
