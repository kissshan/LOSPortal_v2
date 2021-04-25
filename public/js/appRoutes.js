angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/view/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/view/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/view/geek', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'
		})
		

		.when('/view/parties/:accountId', {
			templateUrl: 'views/Parties.html',
			controller: 'PartiesController'	
		})

		.when('/view/collateral/:accountId', {
			templateUrl: 'views/collateral.html',
			controller: 'CollateralController'	
		})

		.when('/view/account/:accountId', {
			templateUrl: 'views/account.html',
			controller: 'AccountController'	
		})
		.when('/view/application/:accountId', {
			templateUrl: 'views/Allaplication.html',
			controller: 'ApplicationController'	
		})
		.when('/view/createApplication', {
			templateUrl: 'views/createApplication.html',
			controller: 'CreateApplicationController'	
		})
		.when('/view/createCollateral/:accountId', {
			templateUrl: 'views/createCollateral.html',
			controller: 'CreateCollateralController'	
		})
		.when('/view/createPartyContact/:accountId', {
			templateUrl: 'views/createParty.html',
			controller: 'CreatePartyController'	
		})
		.when('/view/Document/:accountId/application/:appId', {
			templateUrl: 'views/Document.html',
			controller: 'DocumentController'	
		})
		.when('/view/signin', {
			templateUrl: 'views/Signin.html',
			controller: 'SigninController'	
		})
		.when('/view/signup', {
			templateUrl: 'views/signup.html',
			controller: 'signupController'	
		})
		.when('/view/newApplication/:accountId',{
			templateUrl: 'views/newApplication.html',
			controller: 'NewapplicationController'
		})
		.when('/view/customerDetails/:accountId/productId/:prodId',{
			templateUrl: 'views/customerDetails.html',
			controller: 'customerDetailsController'
		})
		

	$locationProvider.html5Mode(true);

}]);