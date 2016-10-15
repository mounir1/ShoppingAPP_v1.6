angular.module('app.loginCtrl', ['firebase', 'ngCordova'])


    .controller('loginCtrl', function ($scope, $firebaseArray, $rootScope, Auth, ForeignKeys, $firebaseAuth, $ionicModal, $timeout, $state, $ionicHistory, userService,SupervisorService,CategoryService) {

        $scope.LogIn = false;

        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('template/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
        $scope.LoginFB = function () {

            var ref = new Firebase('https://shoppingappaiu.firebaseio.com');

            var authObject = $firebaseAuth(ref);

            authObject.$authWithOAuthPopup('facebook').then(function (authData) {
                var user = authData;
                console.log(user);
                var isNewUser = true;
                console.log(user); 
                $rootScope.CurrentUserID = user.facebook.id;

                $scope.uid = user.facebook.id;
                $scope.name = user.facebook.displayName;
                $scope.email = user.facebook.email || null;
                $scope.photoUrl = user.facebook.profileImageURL;
                $scope.birthday = user.facebook.cachedUserProfile.birthday || null;
                $scope.address = "private";
                $scope.phone = "(---) --- ----";

                var users = userService.all;
                for (var i = 0; i < users.length; i++)
                    if (users[i].uid === $scope.uid) {
                        isNewUser = false;
                        break;
                    }
                
                console.log(isNewUser); 

                $scope.Bankcard = {
                    name: null,
                    no: null,
                    exp: null,
                    cvv: null
                };
                $scope.folowers = [' '];
                $scope.favourites = [' '];
                $scope.cart = [' '];
                $scope.myproducts = [' '];
                if (isNewUser === true) { // new user
                    $scope.newUser = userService.all;
                    $scope.newUser.$add({
                        Bankcard: $scope.Bankcard,
                        cart: $scope.cart,
                        favourites: $scope.favourites,
                        myproducts: $scope.myproducts,
                        uid: $scope.uid,
                        name: $scope.name,
                        email: $scope.email,
                        birthday: $scope.birthday,
                        photoUrl: $scope.photoUrl,
                        date: new Date().getTime(),
                        folowers: $scope.folowers,
                        address: $scope.address,
                        phone: $scope.phone
                    });
                    console.log("user added to users array");
                }
                else { // returning user!
                    $scope.newUser = userService.all;
                    $scope.newUser.$save({
                        name: $scope.name,
                        email: $scope.email,
                        photoUrl: $scope.photoUrl
                    });
                    console.log("user info updated");
                }
                ForeignKeys.setuserid($scope.uid);
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.ListProducts');

            }).catch(function (error) {
                if (error.code === "TRANSPORT_UNAVAILABLE") {

                } else {
                    // Another error occurred
                    console.log(error);
                }
            });
        };
        
  $scope.Logingoogle= function(){
        var ref = new Firebase('https://resplendent-fire-4214.firebaseio.com');
        var authObject = $firebaseAuth(ref);

        authObject.$authWithOAuthPopup('google').then(function(authData){
            console.log(authData);
        }).catch(function(error){
            console.log('error'+error);
        });

    };
        $scope.LogOut = function () {
            if (firebase.auth().currentUser != null) {
                firebase.auth().signOut().then(function () {
                    ForeignKeys.setuserid(null);
                    $rootScope.CurrentUserID = null;
                    $ionicHistory.clearHistory();
                    $state.go($state.current, {}, {reload: true});
                    // Sign-out successful.
                    console.log(name + ' Logged Out');
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('app.ListProducts');
                    $scope.LogIn = false;

                }, function (error) {
                    // An error happened.
                });
            } else {
                alert("LogIn first");
                console.log('LogIn first');
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.ListProducts');
            }
        };
    });

//    $scope.Login= function(){
//        var ref = new Firebase('https://resplendent-fire-4214.firebaseio.com');
//        var authObject = $firebaseAuth(ref);
//        
//        authObject.$authWithOAuthPopup('facebook').then(function(authData){
//        console.log(authData);       
//        }).catch(function(error){
//            console.log('error'+error);
//        });
//        
//    };
//    $scope.Logingoogle= function(){
//        var ref = new Firebase('https://resplendent-fire-4214.firebaseio.com');
//        var authObject = $firebaseAuth(ref);
//
//        authObject.$authWithOAuthPopup('google').then(function(authData){
//            console.log(authData);
//        }).catch(function(error){
//            console.log('error'+error);
//        });
//
//    };
//    $scope.LoginEmail = function(){
// 
//    var ref = new Firebase("https://resplendent-fire-4214.firebaseio.com");
// 
//    ref.authWithPassword({
//    email    : $scope.data.email,
//    password : $scope.data.password
//  }, function(error, authData) {
//    if (error) {
//      console.log("Login Failed!", error);
//    } else {
//      console.log("Authenticated successfully with payload:", authData);
//    }
//  });
// 
//};