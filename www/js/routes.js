angular.module('app.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/',
                abstract: true,
                templateUrl: 'template/home.html',
                controller: 'loginCtrl'
            })
            .state('app.ListProducts', {
                url: '/Products',
                views: {
                    'menuContent': {
                        templateUrl: 'template/list.html',
                        controller: 'listCtrl'
                    }
                }
            })
            .state('app.ListCategories', {
                url: '/Categories',
                views: {
                    'menuContent': {
                        templateUrl: 'template/categories.html',
                        controller: 'CategoryCtrl'
                    }
                }
            })
            .state('app.profile', {
                url: '/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'template/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            }).state('app.EditProfile', {
                url: '/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'template/editProfile.html',
                        controller: 'editProfileCtrl'
                    }
                }
            })

            .state('app.addProduct', {
                url: '/add',
                views: {
                    'menuContent': {
                        templateUrl: 'template/addProduct.html',
                        controller: 'AddProductCtrl'
                    }
                }
            })

            .state('app.editProduct', {
                url: '/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'template/EditProduct.html',
                        controller: 'EditProductCtrl'
                    }
                }
            })
            .state('app.Chat', {
                url: '/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'template/Chat.html',
                        controller: 'ChatCtrl'
                    }
                }
            })
            .state('app.MyChat', {
                url: '/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'template/MyChat.html',
                        controller: 'MyChatCtrl'
                    }
                }
            })
            .state('app.messages', {
                url: '/messages',
                views: {
                    'menuContent': {
                        controller: 'mmMessagesCtrl',
                        templateUrl: 'template/site-messages.html',
                        resolve: {
                            discussions: function (mmMessages) {
                                return mmMessages.getDiscussions();
                            },
                            contacts: function (mmMessages) {
                                return mmMessages.getContacts();
                            }
                        }
                    }
                }
            })
            .state('app.messages-discussion', {
                            tablet: 'app.messages',
                            url: '/messages-discussion/:index',
                            views: {
                                'menuContent': {
                                    controller: 'mmMessageDiscussionCtrl',
                                    templateUrl: 'template/site-messages-discussion.html',
                                    resolve: {
                                        discussion: function ($stateParams, mmMessages) {
                                            return mmMessages.getDiscussion($stateParams.index);
                                        }
                                    }
                                }
                            }
                        })

                        .state('app.messages-contacts', {
                            url: '/messages-contacts',
                            views: {
                                'menuContent': {
                                    controller: 'mmmessagescontactsctrl',
                                    templateurl: 'template/site-messages-contacts.html',
                                    resolve: {
                                        contacts: function (mmmessages) {
                                            return mmmessages.getcontacts();
                                        }
                                    }
                                }
                            }
                        })
                        .state('app.messages-contact', {
                tablet: {
                    parent: 'app.messages',
                    node: 'contacts-tablet'
                },
                url: '/messages-contact/:index',
                views: {
                    'menuContent': {
                        controller: 'mmMessagesContactCtrl',
                        templateUrl: 'template/site-messages-contact.html',
                        resolve: {
                            contact: function ($stateParams, mmMessages) {
                                return mmMessages.getContact($stateParams.index);
                            },
                            index: function ($stateParams) {
                                return $stateParams.index;
                            }
                        }
                    }
                }
            })
            .state('app.SingleProduct', {
                url: '/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'template/Single.html',
                        controller: 'SingleCtrl'
                    }
                }
            })
            .state('app.myProduct', {
                url: '/myProducts',
                views: {
                    'menuContent': {
                        templateUrl: 'template/myProducts.html',
                        controller: 'myProductCtrl'
                    }
                }
            })
            .state('app.electronicDevices', {
                url: '/electronicDevices',
                views: {
                    'menuContent': {
                        templateUrl: 'template/electronicDevices.html',
                        controller: 'electronicDevicesCtrl'
                    }
                }
            })
            .state('app.clothes', {
                url: '/clothes',
                views: {
                    'menuContent': {
                        templateUrl: 'template/clothes.html',
                        controller: 'clothesCtrl'
                    }
                }
            })
            .state('app.cart', {
                url: '/clothes',
                views: {
                    'menuContent': {
                        templateUrl: 'template/cart.html',
                        controller: 'cartCtrl'
                    }
                }
            })

            .state('app.menClothing', {
                url: '/menClothing',
                views: {
                    'menuContent': {
                        templateUrl: 'template/menClothing.html',
                        controller: 'menClothingCtrl'
                    }
                }
            })

            .state('app.womenClothing', {
                url: '/womenClothing',
                views: {
                    'menuContent': {
                        templateUrl: 'template/womenClothing.html',
                        controller: 'womenClothingCtrl'
                    }
                }
            })
            .state('app.books', {
                url: '/Books',
                views: {
                    'menuContent': {
                        templateUrl: 'template/books.html',
                        controller: 'booksCtrl'
                    }
                }
            })
            .state('phones', {
                url: '/phones',
                templateUrl: 'template/phones.html',
                controller: 'phonesCtrl'
            })

            .state('tablets', {
                url: '/tablets',
                templateUrl: 'template/tablets.html',
                controller: 'tabletsCtrl'
            })

            .state('computers', {
                url: '/computers',
                templateUrl: 'template/computers.html',
                controller: 'computersCtrl'
            })

            .state('app.jewelriesWatches', {
                url: '/jewelriesWatches',
                views: {
                    'menuContent': {
                        templateUrl: 'template/jewelriesWatches.html',
                        controller: 'jewelriesWatchesCtrl'
                    }
                }
            })
            .state('app.bikesAndMotorBikes', {
                url: '/bikesAndMotorBikes',
                views: {
                    'menuContent': {
                        templateUrl: 'template/bikesAndMotorBikes.html',
                        controller: 'bikesAndMotorBikesCtrl'
                    }
                }
            })

            .state('app.everythingElse', {
                url: '/everythingElse',
                views: {
                    'menuContent': {
                        templateUrl: 'template/everythingElse.html',
                        controller: 'everythingElseCtrl'
                    }
                }
            })
            .state('app.Folowers', {
                url: '/Folowers',
                views: {
                    'menuContent': {
                        templateUrl: 'template/Folowers.html',
                        controller: 'FolowersCtrl'
                    }
                }
            })

            .state('app.WatchList', {
                url: '/Favourites',
                views: {
                    'menuContent': {
                        templateUrl: 'template/Watchlist.html',
                        controller: 'watchlistCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('//Products')
    });
