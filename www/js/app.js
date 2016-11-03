angular.module('app', ['ionic','app.loginCtrl','app.ListCtrl','app.addProduct' ,'app.controllers', 'app.services','app.routes', 'angularMoment'])

    .run(function ($ionicPlatform, $rootScope, $state, $ionicBody, $window) {

	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		var deviceInformation = ionic.Platform.device();

		var isWebView = ionic.Platform.isWebView();
		var isIPad = ionic.Platform.isIPad();
		var isIOS = ionic.Platform.isIOS();
		var isAndroid = ionic.Platform.isAndroid();
		var isWindowsPhone = ionic.Platform.isWindowsPhone();

		var currentPlatform = ionic.Platform.platform();
		var currentPlatformVersion = ionic.Platform.version();

		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

		var checkTablet = function () {
			$ionicBody.enableClass($ionicPlatform.isTablet(), 'tablet');
		};
		ionic.on('resize', checkTablet, $window);
		checkTablet();
	});

	$rootScope.stateIsLoading = false;
	$rootScope.$on('$stateChangeStart', function () {
		$rootScope.stateIsLoading = true;
	});
	$rootScope.$on('$stateChangeSuccess', function () {
		$rootScope.stateIsLoading = false;
	});
	$rootScope.$on('$stateChangeError', function () {
		//catch error
	});

/*	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

		if (toState.name.substr(0, 5) !== 'login' && !mmAuth.isLoggedIn()) {
			// We are not logged in.
			event.preventDefault();
			console.log('Redirect to login page, request was: ' + toState.name);
			$state.transitionTo('login.index');
		} else if (toState.name.substr(0, 5) === 'login' && mmAuth.isLoggedIn()) {
			// We are logged in and requested the login page.
			event.preventDefault();
			console.log('Redirect to course page, request was: ' + toState.name);
			$state.transitionTo('site.index');
		}

	});
*/

});