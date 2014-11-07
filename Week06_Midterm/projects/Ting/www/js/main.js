/* Your code starts here */

var app = app || {};

app.main = (function() {

    var items = [];
    var code ;

    var init = function() {
        FastClick.attach(document.body);
        app.router.route();
        hashChange();
        attachEvents();
        controller();
    };

    var hashChange = function() {
        $(window).on('hashchange', function() {
            app.router.route();
            attachEvents();
        });
    };

    var attachEvents = function() {
        console.log('attaching events');
        // off().on() every time REMEMBER?
        $('.page')
            .off('webkitTransitionEnd')
            .one('webkitTransitionEnd', function() {
                $(this).addClass('end');
            });
        $('.end')
            .off('webkitTransitionEnd')
            .one('webkitTransitionEnd', function() {
                $(this).remove();
            });
        // opening overlayer
        $('#btnCreate')
            .off('click')
            .on('click', function() {
                app.pages.render.create();
                // close overlayer
                $('#btnOverlayerClose')
                    .off('click')
                    .on('click', function() {
                        console.log('close overlayer');
                        $(this).parent().addClass('slideInFromBottom');
                        $('.overlayer')
                            .off('webkitTransitionEnd')
                            .on('webkitTransitionEnd', function() {
                                $(this).remove();
                            });
                    });
            });
    };

    var controller = function() {
        $('#myImage').off('click').on('click', getCamera);
        $('#itemAddBtn').off('click').on('click', addNewItem);
        $('.itemDelete').off('click').on('click', function() {
            var viewToDelete = $(this).parent();
            items.forEach(function(item,index) {
                if (item.view.itemToRender[0] === viewToDelete[0]) {
                    items[index].model.remove(index);
                }
            });
        });
    };
    var addNewItem =  function() {
        var message = $('#itemInput').val();
        // console.log('adding new item: ' + message);
        //create new model
        new Model(message).create();
        if (message === $('#itemInput')) {
            alert("^-^ OK");
        }

        //code
            this.code = function() {
               code = "aaa";
               // var codeLength = 6;//验证码的长度  
               // var checkCode = document.getElementById("checkCode");  
               // var selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//所有候选组成验证码的字符，当然也可以用中文的  
                  
               for(var i=0;i<codeLength;i++)
               {
                
                  
               var charIndex = Math.floor(Math.random()*36);
               code +=selectChar[charIndex];
                 
                 
               }
                //alert(code);  
               if(checkCode)
               {
                 checkCode.className="code";
                 checkCode.value = code;
               }
                 
             };

              var validate = function() {
               var inputCode = document.getElementById("itemInput").value;
               if(inputCode.length <=0)
               {
                  alert("Enter！");
               }
               else if(inputCode != code )
               {
                  // alert("验证码输入错误！");  
                  // createCode();//刷新验证码  
               }
               else
               {
                  alert("^-^ OK");
               }
               };
    };
    var Model = function(title, like) {
        this.title = title;
        this.like = like || false;

        this.create = function() {
            items.unshift({
                    model: this
            });
            //push goes last
            //unshift goes first (index) and pushes the rest back
            new View(this).create();
            this.render();
        };
        //skip read
        this.render = function() {
            items[0].view.render();
        };
        this.update = function() {};
        this.remove = function(index) {
            items[index].view.remove();
            items.splice(index, 1);
        };
        return this;
    };
    var View = function(model) {
        this.model = model;
            this.create = function() {
                console.log('creating view');
                //create the representation of our data
                var itemContainer = $('<div><img id="myImage" width="50" height="50"/></div>').addClass('item');
                //var itemContainer = document.createElement('div');
                var itemFav = $('<span>&hearts;</span>').addClass('itemFavorite');
                var itemTitle = $('<span></span>').addClass('itemTitle').html(this.model.title);
                var itemDelete = $('<span>&times;</span>').addClass('itemDelete');
                itemFav.appendTo(itemContainer);
                itemTitle.appendTo(itemContainer);
                itemDelete.appendTo(itemContainer);

                this.itemToRender = itemContainer;
                // $('#itemsContainer').append(itemContainer);
                items[0].view = this;
                // this.render();
            };
            this.render = function() {
                $('#itemsContainer').prepend(this.itemToRender);
                controller();
            };
            this.update = function() {};
            this.remove = function() {
                $(this.itemToRender).remove();
                items.splice(index, 1);
            };
            return this;
            // itemContainer.append(itemFav);
    };

    //get Camera

    var getCamera = function() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 50,
            targetHeight: 50
        });

        function onSuccess(imageData) {
            // getLocation();
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };

    return {
        init: init,
        items: items
    };
})();

// if I use browser,
// console.log($.os.phone); // -> false
if($.os.phone) {
    $(document).on('deviceready', app.main.init);
} else {
    $(window).on('load', app.main.init);
}

// 'deviceready'