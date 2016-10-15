angular.module('app.ListCtrl', ['firebase', 'ngCordova'])
.controller('listCtrl', function ($scope, $ionicPopup, $rootScope, $state, productService, $ionicActionSheet, $ionicHistory, $firebaseArray, ForeignKeys, userService) {

    $scope.Products = productService.all;

    $scope.user = userService.getuser($rootScope.CurrentUserID);

    $scope.isforSale = function (product) {
        if (product.sale === true)
            return true;
        else
            return false;
    };

    ///todo Ordering Function
    $scope.orderProductsBy = function (order) {

    };
    console.log("$rootScope.CurrentUserID " + $rootScope.CurrentUserID);

    $scope.isAllowedUser = function (product) {
        if (product.ownerId === $rootScope.CurrentUserID)
            return true;
        else
            return false;
        console.log("product.ownerId  " + product.ownerId);
    };

    // else if ($rootScope.CurrentUserID !== undefined)
    //     alert($scope.user.name + " You don't have right to perform this action ! ");
    // else alert(" You don't have right to perform this action !");
    // return false ;

    ///todo refresh function
    // $scope.doRefresh = function () {
    //     $scope.Products = productService.all;
    //     $ionicHistory.nextViewOptions({
    //         disableBack: true
    //     });
    //     $state.go('app.ListProducts');
    // };

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
                item.star = !item.star;
                $scope.user.favourits.push(item.$id);
            }
            $scope.users.$save($scope.user);
        }
        ///todo notify the owner about the like !!
        else {
            item.star = !item.star;

            alert("LogIn to add this to your Favourite List");
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
                    title: 'Manage Cart ',
                    template: 'This Product is Already in your cart Do you want to remove it ?'
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

        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.ListProducts');
        ///todo notify Original User About the Purchase request !!
    };

    $scope.Delete = function (item) {
        if ($rootScope.CurrentUserID === item.ownerId) {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete',
                template: 'Do You want to remove this Product?'
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
});