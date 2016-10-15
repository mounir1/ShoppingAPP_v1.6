angular.module('app', ['ionic','app.loginCtrl','app.ListCtrl','app.addProduct' ,'app.controllers', 'app.services','app.routes', 'angularMoment'])

    .run(function ($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            $rootScope.logout = function () {
                console.log("Logging out from the app");
            }
        })
    });