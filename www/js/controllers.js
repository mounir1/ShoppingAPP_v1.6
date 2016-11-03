angular.module('app.controllers', ['firebase', 'ngCordova', 'ionic.rating'])

    .value('mmMessagesMessageTabConst', 0)
    .value('mmMessagesContactTabConst', 1)

    .controller('ProfileCtrl', function ($scope, $rootScope, $state, userService, $stateParams, $ionicHistory, ForeignKeys) {
        $scope.currentuser = false;
        $scope.USER = userService.getuser($rootScope.CurrentUserID);
        $scope.owner = userService.getuser($stateParams.id);


        if ($rootScope.CurrentUserID === $stateParams.id) // current user's profile
            $scope.currentuser = true;
        else {
            if ($rootScope.CurrentUserID === undefined) {
                //                alert("Login First to view this person details ");
                //                $ionicHistory.nextViewOptions({
                //                    disableBack: true
                //                });
                //                $state.go('app.ListProducts');
            }
        }
        $scope.follow = function (id) {
            $scope.USER.followers.push(id);


        }

        console.log("currentuser  " + $scope.currentuser);

    })


    .controller('mmMessagesCtrl', function ($scope, $state, $ionicPlatform, mmMessages, contacts, discussions) {
        var personIndex = null;

        $scope.contacts = contacts;
        $scope.discussions = discussions;

        $scope.showDiscussionLink = false;
        $scope.showInfoLink = false;

        $scope.goDiscussion = function () {
            $scope.showDiscussionLink = false;
            $scope.showInfoLink = true;
            $state.go('app.messages.tablet', { index: personIndex });
        };
        $scope.goInfo = function () {
            $scope.showDiscussionLink = true;
            $scope.showInfoLink = false;
            $state.go('app.messages.contacts-tablet', { index: personIndex });
        };

        // Implemented this way for faster DOM update.
        $scope.$watch(function () {
            return $state.is('app.messages.contacts-tablet');
        }, function (newv, oldv, $scope) {
            if (newv) {
                $scope.showDiscussionLink = true;
                $scope.showInfoLink = false;
            }
        });

        $scope.$watch(function () {
            return $state.is('app.messages.tablet');
        }, function (newv, oldv, $scope) {
            if (newv) {
                $scope.showDiscussionLink = false;
                $scope.showInfoLink = true;
            }
        });

        $scope.$on('mmMessagesContactSelected', function (e, index) {
            personIndex = contacts[index].index;
        });
        $scope.$on('mmMessagesDiscussionSelected', function (e, index) {
            personIndex = index;
        });
    })

    .controller('mmMessagesContactsCtrl', function ($rootScope, $state, $scope, mmMessages, $ionicTabsDelegate, $ionicPlatform, mmMessagesContactTabConst) {
        $scope.currentIndex = null;
        $scope.$on('mmMessagesContactSelected', function (e, index) {
            $scope.currentIndex = index;
        });
        $scope.$on('mmMessagesDiscussionSelected', function (e, index) {
            if (mmMessagesContactTabConst != $ionicTabsDelegate.$getByHandle('messages-tabs').selectedIndex()) {
                $scope.currentIndex = null;
            }
        });

        $scope.getURL = function (index) {
            if ($ionicPlatform.isTablet()) {
                return $state.href('app.messages.contacts-tablet', { index: index });
            }
            return $state.href('app.messages-contact', { index: index });
        };
    })

    .controller('EditProductCtrl', function ($rootScope, userService, $stateParams, $state, $scope, productService, $ionicHistory, ForeignKeys) {

        $scope.categories = ["Clothing", "Smart Phones", "Books,EBooks", "Computers/Tablets", "Bikes and MotorBikes", "Vehicules and Cars", "Jewelries and watches", "Anything else"];

        $scope.data = {};


        $scope.isEdit = true;

        $scope.Products = productService.all;
        $scope.product = productService.get($stateParams.id);

        $scope.title = $scope.product.title;
        $scope.price = $scope.product.price;
        $scope.quantity = $scope.product.quantity;
        $scope.description = $scope.product.description;
        $scope.img = $scope.product.img;
        $scope.isused = $scope.product.isused;
        $scope.forsale = $scope.product.sale;
        $scope.data.index = $scope.product.categoryId;

        $scope.myid = $scope.product.$id;

        $scope.updateProduct = function (id) {
            var product = $scope.Products.$getRecord(id);

            product.title = $scope.title;
            product.price = $scope.price;
            product.quantity = $scope.quantity;
            product.description = $scope.description;
            product.img = $scope.img;
            product.isused = $scope.isused;
            product.sale = $scope.forsale;
            product.categoryId = $scope.data.index;

            $scope.Products.$save(product);
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.ListProducts');
        };


    })


    .controller('SingleCtrl', function ($scope, $ionicPopup, $cordovaSocialSharing, $rootScope, productService, $stateParams, userService, $ionicHistory, ForeignKeys) {

        $scope.singleProduct = productService.get($stateParams.id);
        $scope.owner = userService.getuser($scope.singleProduct.ownerId);
        $scope.user = userService.getuser($rootScope.CurrentUserID);

        $scope.rating = {};
        $scope.rating.rate = $scope.singleProduct.rate;
        $scope.rating.max = 5;
        $scope.isAllowedUser = function (product) {
            if (product.ownerId === $rootScope.CurrentUserID)
                return true;
            else
                return false;
        };
        $scope.Delete = function (item) {
            if ($rootScope.CurrentUserID === item.ownerId) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Delete '
                    , template: 'Do You want to remove this Product?'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        $scope.Products.$remove(item);
                    } else {
                        console.log('You are not sure so !');
                    }
                });
            } else {
                alert("You don't have right to perform this action !");
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.ListProducts');
            }
        };
        $scope.AddToCart = function (item) {
            $scope.incart = false;
            if ($rootScope.CurrentUserID !== undefined) {
                $scope.users = userService.all;
                $scope.user = userService.getuser($rootScope.CurrentUserID);
                for (var i = 0; i < $scope.user.cart.length; i++) {
                    if ($scope.user.cart[i] === item.$id) {
                        $scope.incart = true;
                        break;
                    }
                }
                if (!$scope.incart)
                    $scope.user.cart.push(item.$id);
                else {

                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Manage Cart '
                        , template: 'This Product is Already in your cart Do you want to remove it ?'
                    });

                    confirmPopup.then(function (res) {
                        if (res) {
                            $scope.user.cart.pop(item.$id);
                        } else {
                            console.log('You are not sure so the product is in cart !');
                        }
                    });

                }
                $scope.users.$save($scope.user);
            } else
                alert("LogIn to add this to your Cart");

            // notify Original User About the Purchase request !!
        };


        $scope.AddFavorite = function (item) {
            $scope.user = userService.getuser($rootScope.CurrentUserID);
            $scope.faved = false;
            if ($rootScope.CurrentUserID !== undefined) {
                $scope.users = userService.all;
                for (var i = 0; i < $scope.user.favourits.length; i++) {
                    if ($scope.user.favourits[i] === item.$id) {
                        $scope.faved = true;
                        item.star;
                        break;
                    }
                }
                if ($scope.faved)
                    $scope.user.favourits.pop(item.$id);
                else {
                    !item.star;
                    $scope.user.favourits.push(item.$id);
                }
                $scope.users.$save($scope.user);
            } else {
                item.star = !item.star;
                alert("LogIn to add this to your Favourite List");
            }
        };

        $scope.RateIt = function () {
            singleProduct.rate = $scope.rate;
            console.log($scope.rate);
        };


        $scope.BuyNow = function (product) {

            ///todo initialize payment Method and check the owner response
            // payment method paypal pays the app account and then the supervisors will deall paying each owner of the products in the cart.

        }
        $scope.whatsappShare = function () {
            window.plugins.socialsharing.shareViaWhatsApp('Check out this Awsome Product for sale in shopping App', $scope.singleProduct.img, $scope.singleProduct.title, "for only" + $scope.singleProduct.price, function (errormsg) {
                alert("Error: Cannot Share")
            });
        }
        $scope.twitterShare = function () {
            window.plugins.socialsharing.shareViaTwitter('Check out this Awsome Product for sale in shopping App', $scope.singleProduct.title, 'ShoppingApp', $scope.singleProduct.img
                , function (errormsg) {
                    alert("Error: Cannot Share")
                });
        }
        $scope.OtherShare = function () {
            window.plugins.socialsharing.share('Check out this Awsome Product for sale in shopping App', $scope.singleProduct.img, $scope.singleProduct.title, "for only" + $scope.singleProduct.price);
        }
        $scope.ShareFacebook = function () {
            $cordovaSocialSharing.share("Check out this Awsome Product for sale in shopping App !", $scope.singleProduct.title, $scope.singleProduct.img, "https://www.facebook.com");
        }
    })

    .controller('editProfileCtrl', function ($scope, $state, userService, $stateParams, $ionicHistory, ForeignKeys) {
        $scope.users = userService.all;
        $scope.owner = userService.getuser($stateParams.id);


        $scope.updateProfile = function () {
            $scope.users.$save($scope.owner);
            console.log("updated ...");
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.ListProducts');
        };
    })

    .controller('ChatCtrl', function ($scope, $firebase, Messages, $rootScope, userService, $stateParams) {
        $scope.chats = Messages.allRooms;
        $scope.mychat;
        $scope.fromuser = userService.getuser($rootScope.CurrentUserID);
        $scope.touser = userService.getuser($stateParams.id);
        for (var i = 0; i < $scope.chats.length; i++) {
            if ($scope.chats[i].from === $rootScope.CurrentUserID && $scope.chats[i].to === $stateParams.id ||
                $scope.chats[i].to === $rootScope.CurrentUserID && $scope.chats[i].from === $stateParams.id) {
                $scope.mychat = $scope.chats.getRoom($scope.chats[i].$id)
                $scope.mychat.$add({
                    from: $scope.fromuser.name
                    , to: $scope.touser.name
                    , message: chat.message
                    , time: new Date().getTime()
                });
                $scope.chats.$save($scope.mychat);
            }
            else { // new chat rooms here
                $scope.chats.$add({
                    from: $scope.fromuser.name
                    , to: $scope.touser.name
                    , message: chat.message
                    , time: new Date().getTime()
                });
            }
            chat.message = "";
            break;

        }
        //openchatroomid;
    })

    //    .controller('ChatCtrl', function ($scope,Messages,$stateParams,userService, productService) {
    //
    //            $scope.messages= Messages.all;
    //
    //			$scope.sendMessage = function(message){
    //				Message.create(message);
    //			};
    //
    //
    //
    //    })
    .controller('MyChatCtrl', function ($scope, $rootScope, Messages, $stateParams, userService, productService) {

        var messages = Messages.all;
        $scope.mychats = Messages.allRooms;
        $scope.myRoom = [''];
        $rootScope.newmessages = 0;
        for (var i = 0; i < $scope.mychats.length; i++) {
            if ($scope.mychats[i].from === $rootScope.CurrentUserID || $scope.mychats[i].to === $rootScope.CurrentUserID) {
                $scope.myRoom.push($scope.mychats[i]);
                $rootScope.newmessages = $rootScope.newmessages + 1;
            }
        }

    })
    .controller('electronicDevicesCtrl', function ($scope, productService) {


    })

    .controller('clothesCtrl', function ($scope) {

    })

    .controller('menClothingCtrl', function ($scope) {

    })

    .controller('womenClothingCtrl', function ($scope) {

    })

    .controller('phonesCtrl', function ($scope) {

    })

    .controller('tabletsCtrl', function ($scope) {

    })

    .controller('computersCtrl', function ($scope) {

    })

    .controller('booksCtrl', function ($scope) {

    })

    .controller('jewelriesWatchesCtrl', function ($scope) {

    })

    .controller('bikesAndMotorBikesCtrl', function ($scope) {

    })
    .controller('everythingElseCtrl', function ($scope) {

    })

    .controller('cartCtrl', function ($scope, $rootScope, productService, $ionicHistory, userService, cartService) {

        $scope.USER = userService.getuser($rootScope.CurrentUserID);
        $scope.cart = $scope.USER.cart;
        $scope.cartproducts = [''];
        $scope.Total = 0;


        if ($scope.cart === [' ']) {
            console.log(" cart is empty right noow !");
        } else {
            for (var i = 0; i < $scope.cart.length; i++) {
                var product = productService.get($scope.cart[i])
                $scope.cartproducts.push(product);
            }

        }
        //    for (var i = 0; i < $scope.cartproducts.length; i++) {
        //            $scope.Total = $scope.Total + $scope.cartproducts[i].price;
        //        }
    })

    .controller('watchlistCtrl', function ($scope, $ionicHistory, userService, productService) {
        $scope.USER = userService.getuser($rootScope.CurrentUserID);
        $scope.cart = $scope.USER.cart;
        $scope.Favproducts = [''];
        $scope.Total = 0;


        if ($scope.cart === [' ']) {
            console.log(" cart is empty right noow !");
        } else {
            for (var i = 0; i < $scope.cart.length; i++) {
                var product = productService.get($scope.cart[i])
                $scope.Favproducts.push(product);

            }
        }
    })
    .controller('mmMessagesContactCtrl', function ($rootScope, $scope, $state, $ionicPlatform, index, contact) {
        $scope.contact = contact;
        $scope.index = index;
        $scope.sendMessage = function () {
            if ($ionicPlatform.isTablet()) {
                $state.go('app.messages.tablet', { index: index });
            } else {
                $state.go('app.messages-discussion', { index: index });
            }
        };
        $rootScope.$broadcast('mmMessagesContactSelected', index);
    })

    .controller('mmContactsCtrl', function ($rootScope, $scope, $state, $ionicPlatform, index, contact) {
        $scope.contact = contact;
        $scope.index = index;
        $scope.sendMessage = function () {
            if ($ionicPlatform.isTablet()) {
                $state.go('app.messages.tablet', { index: index });
            } else {
                $state.go('app.messages-discussion', { index: index });
            }
        };
        $rootScope.$broadcast('mmMessagesContactSelected', index);
    })

    .controller('mmMessagesDiscussionsCtrl', function ($rootScope, $scope, $stateParams, $state, $ionicPlatform, $ionicTabsDelegate, mmMessagesMessageTabConst) {

        // We can create a service for return device information.
        $scope.currentIndex = null;

        $scope.$on('mmMessagesContactSelected', function (e, index) {
            if (mmMessagesMessageTabConst != $ionicTabsDelegate.$getByHandle('messages-tabs').selectedIndex()) {
                $scope.currentIndex = null;
            }
        });
        $scope.$on('mmMessagesDiscussionSelected', function (e, index) {
            $scope.currentIndex = index;
        });

        $scope.getURL = function (index) {
            if ($ionicPlatform.isTablet()) {
                return $state.href('app.messages.tablet', {
                    index: index
                });
            }
            return $state.href('app.messages-discussion', {
                index: index
            });
        };
        console.log('go go to getURL');
    })


    .controller('mmMessageDiscussionCtrl', function ($rootScope, $scope, $stateParams, $ionicScrollDelegate, $timeout, mmMessages, discussion) {
        var sv, lastDate = null;

        $scope.index = $stateParams.index;

        // We can create a service for return device information.

        // Scroll to the botton.
        $timeout(function () {
            sv = $ionicScrollDelegate.$getByHandle('messagesScroll');
            sv.scrollBottom();
        });

        $scope.addMessage = function (message) {
            if (!message) {
                return;
            }
            mmMessages.addMessage($stateParams.index, message);
            sv.scrollBottom();
        };

        $scope.showDate = function (message) {
            var d = new Date(message.time);
            d.setMilliseconds(0);
            d.setSeconds(0);
            d.setMinutes(0);
            d.setHours(1);

            if (!lastDate || d.getTime() != lastDate.getTime()) {
                lastDate = d;
                return true;
            }
        };

        $scope.discussion = discussion;
        $rootScope.$broadcast('mmMessagesDiscussionSelected', $stateParams.index);
    })

    .controller('CategoryCtrl', function ($scope, $ionicHistory, productService) {

    })

    .controller('mmMessageDiscussionCtrl', function ($rootScope, $scope, $stateParams,
        $ionicScrollDelegate, $timeout, mmMessages, discussion) {
        var sv,
            lastDate = null;
        console.log('went to getURL');

        $scope.index = $stateParams.index;

        // We can create a service for return device information.
        $scope.isTablet = document.body.clientWidth > 600;

        // Scroll to the botton.
        $timeout(function () {
            sv = $ionicScrollDelegate.$getByHandle('messagesScroll');
            sv.scrollBottom();
        });

        $scope.addMessage = function (message) {
            if (!message) {
                return;
            }
            mmMessages.addMessage($stateParams.index, message);
            sv.scrollBottom();
        };

        $scope.showDate = function (message) {
            var d = new Date(message.time);
            d.setMilliseconds(0);
            d.setSeconds(0);
            d.setMinutes(0);
            d.setHours(1);

            if (!lastDate || d.getTime() != lastDate.getTime()) {
                lastDate = d;
                return true;
            }
        };

        $scope.discussion = discussion;
        $rootScope.$broadcast('mmMessagesDiscussionSelected', $stateParams.index);
    });
