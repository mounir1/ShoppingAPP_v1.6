angular.module('app.addProduct', ['firebase', 'ngCordova'])

.controller('AddProductCtrl', function ($scope, $rootScope, CategoryService, userService, $cordovaCamera, ForeignKeys, $ionicHistory, $firebaseArray, $state, productService) {


    $scope.categories = ["Clothing", "Smart Phones", "Books,EBooks", "Computers/Tablets", "Bikes and MotorBikes", "Vehicules and Cars", "Jewelries and watches", "Anything else"];

    $scope.subcategory0=["Women Clothes", "Men Clothes","Children Clothes"];
    $scope.subcategory1=["Android", "ios"];
    $scope.subcategory2=["Books", "Ebooks"];
    $scope.subcategory3=["Computers", "Tablets"];
    $scope.subcategory4=["Bikes", "MotorBikes"];
    $scope.subcategory5=["Vehicules", "Cars"];
    $scope.subcategory6=["Jewelries", "watches"];
    
    $scope.data = {};
    $scope.data.index = 1;
    $scope.choice = function () {
        console.log($scope.data.index);
    };


    $scope.saveProduct = function () {
        if ($rootScope.CurrentUserID !== undefined) {
            $scope.forsale = true;
            $scope.isused = false;
            $scope.rate = 5;
            $scope.newNote = productService.all;
            $scope.newNote.$add({
                title: $scope.title,
                description: $scope.description,
                quantity: $scope.quantity,
                price: $scope.price,
                isused: $scope.isused,
                sale: $scope.forsale,
                date: new Date().getTime(),
                categoryId: $scope.data.index,
                img: $scope.img,
                rate: $scope.rate,
                ownerId: $rootScope.CurrentUserID
            });
            $scope.users = userService.all;
            $scope.user = userService.getuser($rootScope.CurrentUserID);
            $scope.user.myproducts.push($scope.title);
            $scope.users.$save($scope.user);
        } else
            alert("LogIn to add this Product");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.ListProducts');
    };


    $scope.userPic = function () {
        console.log("userPic function got called");
        $ionicPopup.show({
            template: '<p>Take picture or use from library</p>',
            title: 'Choose',
            buttons: [
                {
                    text: '<b>Camera</b>',
                    onTap: function (e) {
                        return "camera";
                    }
                    },
                {
                    text: '<b>Library</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        return "library";
                    }
                    }
                ]
        }).then(function (resp) {
            $scope.takePicture(resp);
            console.log('resp', resp);
        });
    };

    $scope.takePicture = function (resp) {
        console.log("takePicture function got called");
        console.log(resp);
        var source;
        if (resp == "camera") {
            source = Camera.PictureSourceType.CAMERA;
        } else {
            source = Camera.PictureSourceType.PHOTOLIBRARY;
        }
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: source,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            console.log(imageData);
        }, function (err) {
            console.log(err);
            // error
        });
    };
    $scope.photos = [' '];
    if ($scope.img !== null)
        $scope.photos.push($scope.img);
    if ($scope.imgURI !== null)
        $scope.photos.push($scope.imgURI);

});
