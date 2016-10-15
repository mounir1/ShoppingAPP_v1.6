angular.module('app.services', ['firebase'])


    .factory('productService', function ($firebaseArray) {

        var ref = new Firebase("https://shoppingappaiu.firebaseio.com/Products");

        var Products = $firebaseArray(ref);

        var productService = {
            all: Products,
            get: function (prodductId) {
                return Products.$getRecord(prodductId);
                
            }, 
            Update: function(product){
                for (var i = 0 ; i<Products.length;i++){
                    if (Products[i].$id === product.$id){
                        productref = ref.child(product.$id);
                        console.log("ref.child(product.$id) " +product.$id);
                        console.log("ref.child(product.title) "+ product.title);
                        console.log("ref.child(product.price) " +product.price);
                        productref.child('title').set(product.title);
                        productref.child('price').set(product.price);
                        break;
                    }
                }
            }
        };
        return productService;
    })
    .factory('userService', function ($firebaseArray) {

        var ref = new Firebase("https://shoppingappaiu.firebaseio.com/Users");
        // var favref = new Firebase("https://shoppingapp-1299.firebaseio.com/Users/favourites");
        // var cartref = new Firebase("https://shoppingapp-1299.firebaseio.com/Users/Cart");
        // var myproductref = new Firebase("https://shoppingapp-1299.firebaseio.com/Users/myProducts");
        // var bankcardref = new Firebase("https://shoppingapp-1299.firebaseio.com/Users/BankCard");

        var users = $firebaseArray(ref);
        // var favorites = $firebaseArray(favref);
        // var cart = $firebaseArray(cartref);
        // var myProducts = $firebaseArray(myproductref);
        // var bankcard = $firebaseArray(bankcardref);


        var userService = {
///todo create id for each user cart and fav list 

            all: users,
            // fav: favorites,
            // myProducts: myProducts,
            // bankCard: bankcard,
            // cart: cart

            getuser: function (userId) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].uid === userId) {
                        console.log(users[i].uid + "equal : " + userId);
                        return users[i];
                    }
                }
                return undefined;
            },
            addfav: function (productid, userid) {
                var User = userService.getuser(userid);
                User.favourits.push(productid)
            },
            getcart: function (cartid) {
                return cart.$getRecord(cartid);
            },
            getfav: function (favId) {
                return favorites.$getRecord(favId);
            },
            getproducts: function (productId) {
                return myproducts.$getRecord(productId);
            }
        };
        return userService;

    })
    .factory('cartService', function ($firebaseArray) {
        var ref = new Firebase("https://shoppingappaiu.firebaseio.com/Carts");

        var carts = $firebaseArray(ref);
        var cartService = {
            all: carts,
            get: function (cartId) {
                return users.$getRecord(cartId);
            }
        };
        return cartService;

    })
    .factory('CategoryService', function ($firebaseArray) {

        var ref = new Firebase("https://shoppingappaiu.firebaseio.com/Categories");

        var categories = $firebaseArray(ref);
        var CategoryService = {
            all: categories,
            get: function (categoryId) {
                return categories.$getRecord(categoryId);
            }
        };
        return CategoryService;
    })
    .factory('SupervisorService', function ($firebaseArray) {

        var ref = new Firebase("https://shoppingappaiu.firebaseio.com/Supervisors");

        var supervisors = $firebaseArray(ref);
        var SupervisorService = {
            all: supervisors,
            get: function (categoryId) {
                return supervisors.$getRecord(categoryId);
            }
        };
        return SupervisorService;
    })
    .factory('Auth', function ($firebaseAuth) {
        var usersRef = new Firebase("https://shoppingappaiu.firebaseio.com/");
        return $firebaseAuth(usersRef);
    })
    .factory('Messages', function($firebaseArray) {
   
        var ref = new Firebase('https://shoppingappaiu.firebaseio.com/Chat');
		
		var messages = $firebaseArray(ref);
    
        var chatrooms = $firebaseArray(ref.child('roomID'));
    
		var Messages = {
			all: messages,
			create: function (message) {
				return messages.$add(message);
			},
            allRooms : chatrooms,
            getRoom : function(roomid){
                return chatroom.etRecord(roomid);
            },
			get: function (messageId) {
				return $firebase(ref.child('messages').child(messageId)).$asObject();
			},
			delete: function (message) {
				return messages.$remove(message);
			}
		};
		return Messages;
    })
    .service('ForeignKeys', function () {
        var isedit = false;
        var userid = null;
        var productid = null;
        var product = null;

        return {
            setproduct: function (value) {
                product = value;
            },
            setuserid: function (value) {
                console.log("setuserid : " + value);
                userid = value;
            },
            setproductid: function (value) {
                productid = value;
            },
            getproduct: function () {
                return product;
            },
            getuserid: function () {
                return userid;
            },

            getproductid: function () {
                return productid;
            },
            Isedit: function () {
                return isedit;
            },
            setEdit: function (value) {
                isedit = value;
            }

        };
    });