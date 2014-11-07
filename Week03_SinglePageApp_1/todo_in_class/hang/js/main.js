/* Your code starts here */

var app=app||{};

app.main=(function(){

	var items=[];

	var init=function(){
		controller();
	};

	var controller=function(){
		var addNewItem=function(){
			var message=$('#itemInput').val();
			new Model(message).create();
		};	

		var deleteItem=function(){
			var parent= $(this).parent();
			items.forEach(function(item,index){
				if(item.view.itemtoRender[0]==parent[0]){
					items[index].model.remove(index);
				}
			});
		};

		$('#itemAddBtn').off('click').on('click',addNewItem);
		$('.itemDelete').off('click').on('click',deleteItem)
	};




	var Model=function(title,like){
		this.title = title;
		this.like = like || false;

		this.create=function(){
			items.unshift({
				model:this
			});
			new View(this).create();
			this.render();
		};
		this.render=function(){
			items[0].view.render();
		};
		this.update=function(){

		};
		this.remove=function(index){
			items[index].view.remove(index);
		};
	};

	var View=function(model){
		this.model=model;
		this.create = function(){
			var itemContainer=$('<div></div>').addClass('item');
			var itemFav=$('<span></span>').addClass('itemFavorite').html("&#10084;").appendTo(itemContainer);
			var itemTitle=$('<span></span>').addClass('itemTitle').html(this.model.title).appendTo(itemContainer);
			var itemDelete=$('<span></span>').addClass('itemDelete').html("&times;").appendTo(itemContainer);

			items[0].view=this;

			this.itemtoRender=itemContainer;
			};
		this.render =function(){
			$('#itemsContainer').append(this.itemtoRender);
			controller();

		};
		this.update =function(){

		};
		this.remove =function(index){
			$(this.itemtoRender).remove();
			items.splice(index,1);
		};

	};

	return{
		init:init,
	};

})();

$(document).on('ready',app.main.init);