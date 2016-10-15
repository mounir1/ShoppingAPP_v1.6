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
    .factory('mmMessages', function () {

    var contacts = [];
    var discussions = [
        {
            messages: [],
            from: {
                name: 'Lily Alexander',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/76.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Thomas Henry',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/9.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Cody Franklin',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/16.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Brooklyn Johnson',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/39.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Katrina Baker',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/46.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Leonard Holmes',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/3.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Gertrude Reyes',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/87.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Carla Anderson',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/42.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Jon Hill',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/28.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Gene Gibson',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/47.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Kenzi Davidson',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/49.jpg'
            }
        },
        {
            messages: [],
            from: {
                name: 'Vickie Hicks',
                thumb: 'https://randomuser.me/api/portraits/med/women/35.jpg'
            }
        }
    ];

    messageBank = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Vivamus non magna rhoncus, elementum velit eget, molestie urna.',
        'Donec et purus et erat sodales eleifend non sed erat.',
        'Phasellus a tortor semper, volutpat nulla non, rutrum odio.',
        'Aenean ut orci efficitur, gravida diam ut, luctus ligula.',
        'Donec viverra ipsum eget est consectetur, a suscipit lorem rhoncus.',
        'Suspendisse et felis a quam pulvinar hendrerit.',
        'Curabitur accumsan velit sollicitudin, fermentum sapien vel, posuere lacus.',
        'Maecenas vestibulum velit vitae orci elementum, in ultrices nulla lobortis.',
        'Etiam fringilla orci ut tellus mollis sagittis.',
        'Duis vehicula lacus sed aliquam dapibus.',
        'Etiam vehicula ligula sed lorem commodo, et iaculis ipsum placerat.',
        'Nulla lobortis est sit amet ex cursus dapibus.',
        'Vestibulum sollicitudin dolor non nunc bibendum ultrices.',
        'Aliquam varius urna ut diam blandit ullamcorper sed nec sem.',
        'Fusce imperdiet lorem imperdiet tortor sodales pharetra.',
        'Fusce mollis orci commodo orci dignissim, nec gravida mi euismod.',
        'Aenean in nunc eu tellus scelerisque dapibus.',
        'Aliquam eleifend ante varius dolor congue rhoncus.',
        'Fusce condimentum ante quis tortor rhoncus fringilla.',
        'Curabitur vitae enim ut turpis bibendum finibus id at nibh.',
        'Morbi vitae tellus eget ligula suscipit convallis.',
        'Mauris in nunc sed mauris faucibus volutpat at vitae sapien.',
        'Praesent vitae velit a purus blandit mattis non aliquam neque.',
        'Phasellus sit amet dui a lorem tempus fermentum.',
        'Vivamus vitae ligula tempus, tincidunt enim at, cursus turpis.',
        'Praesent non eros convallis, egestas urna sed, iaculis velit.',
        'Ut vel augue eget odio egestas interdum.',
        'Nunc et orci feugiat, efficitur nibh at, luctus nulla.',
        'Fusce tristique tortor eu sodales consequat.',
        'Praesent ac arcu sed est feugiat consectetur a in urna.',
        'Proin eget odio et velit iaculis auctor eget ac ipsum.',
        'Praesent tempus elit in ante viverra, non maximus ex sodales.',
        'Donec pretium ipsum nec bibendum tincidunt.',
        'Fusce congue quam ac fringilla vulputate.',
        'Donec posuere dui et neque rutrum, iaculis semper nunc condimentum.',
        'Nam ac augue vel nisi porttitor rhoncus.',
        'Sed ut orci pretium, bibendum risus eget, consectetur orci.',
        'Duis consectetur libero et tellus aliquet, nec lacinia mi sollicitudin.',
        'Suspendisse tincidunt nibh sed interdum porta.',
        'Quisque eu tortor iaculis, hendrerit lectus eget, tristique nisi.',
        'Aenean imperdiet lacus eget elementum laoreet.',
        'Aliquam quis lorem ac dolor bibendum pellentesque ac id nisl.',
        'Nunc faucibus massa eu congue iaculis.',
        'Morbi sed neque in est euismod aliquam.',
        'Phasellus accumsan augue eget ornare varius.',
        'Ut ut quam feugiat, congue orci et, ultrices tellus.',
        'Donec a enim ac metus volutpat elementum.',
        'Nunc consectetur magna vel risus vulputate, eu eleifend erat tristique.',
        'Integer quis orci luctus, commodo nisl id, dapibus metus.',
        'Mauris in nunc rhoncus, consectetur quam faucibus, convallis augue.',
        'Nullam efficitur nibh viverra massa feugiat, at vehicula erat tincidunt.',
        'Nulla finibus augue vitae metus efficitur, in blandit neque condimentum.',
        'Nunc sit amet nulla iaculis, commodo nulla id, vehicula augue.',
        'Vestibulum ultrices diam non elit ornare, sed maximus ipsum bibendum.',
        'Suspendisse sed arcu commodo, blandit lectus vel, vulputate quam.',
        'Nullam imperdiet sem non malesuada rhoncus.',
        'Praesent eu dolor maximus, sodales risus ac, efficitur orci.',
        'Praesent porta diam et nibh condimentum aliquam.',
        'Integer quis lacus finibus, convallis sapien vel, sodales urna.',
        'Aliquam quis nibh pulvinar, hendrerit nibh sed, feugiat diam.',
        'Pellentesque elementum libero eu lorem tincidunt congue.',
        'Aenean ut arcu imperdiet, tincidunt augue eu, sodales sapien.',
        'Ut pulvinar nulla id ultricies pulvinar.',
        'Ut dapibus lorem nec commodo malesuada.',
        'Aenean pulvinar est et molestie rutrum.',
        'Suspendisse eu diam vehicula nibh auctor suscipit'];

    function generateDiscussions() {
        var index = 0,
            count = 0,
            msgidx = 0,
            startDate = new Date();

        if (discussions[19]) {
            // A few discussions have already been generated.
            return;
        }

        for (var i = 0; i < 20; i++) {

            // Copy existing conversation here.
            if (!discussions[i]) {
                discussions[i] = discussions[index];
            }

            // Generate conversation.
            if (discussions[index].messages.length < 1) {
                count = Math.floor(Math.random() * 20) + 5;
                for (var j = 0; j < count; j++) {
                    msgidx = Math.floor(Math.random() * messageBank.length);
                    discussions[index].messages.push({
                        message: messageBank[msgidx],
                        mine: Math.round(Math.random()) > 0 ? true : false,
                        time: Math.round(startDate.getTime() / 1000 - Math.random() * 500000) * 1000
                    });
                }
            }

            index++;
            if (index >= discussions.length) {
                index = 0;
            }
        }
    }

    function addMessage(index, message) {
        discussions[index].messages.push({
            mine: true,
            time: new Date(),
            message: message
        });
    }

    function getContact(index) {
        generateDiscussions();
        return discussions[index].from;
    }

    function getContacts(index) {
        var tmp = {};
        if (contacts.length < 1) {
            generateDiscussions();
            angular.forEach(discussions, function (v, k) {
                if (tmp[v.from.name]) {
                    return;
                }
                tmp[v.from.name] = true;
                contacts[k] = v.from;
                contacts[k]['index'] = k;
            });
        }
        return contacts;
    }

    function getDiscussion(index) {
        generateDiscussions();
        return discussions[index];
    }

    function getDiscussions() {
        generateDiscussions();
        return discussions;
    }

    return {
        addMessage: addMessage,
        getContact: getContact,
        getContacts: getContacts,
        getDiscussion: getDiscussion,
        getDiscussions: getDiscussions
    };

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
