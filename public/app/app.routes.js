angular.module('app.routes', ['ngRoute']) 
.config(function($routeProvider, $locationProvider){

	$routeProvider

	.when('/',{
		templateUrl: './app/views/welcome.html',
		controller: 'orderController',
		controllerAs: 'order'
	})
	.when('/configuration',{
		templateUrl: './app/views/configuration.html',
		controller: 'configController',
		controllerAs: 'config'
	})
	.when('/configuration/ingredients',{
		templateUrl: './app/views/config/ingredients.html',
		controller: 'configController',
		controllerAs: 'config'
	})
	.when('/configuration/categories',{
		templateUrl: './app/views/config/categories.html',
		controller: 'configController',
		controllerAs: 'config'
	})
	.when('/configuration/vendors',{
		templateUrl: './app/views/config/vendors.html',
		controller: 'configController',
		controllerAs: 'config'
	})
	.when('/configuration/items',{
		templateUrl: './app/views/config/items.html',
		controller: 'configController',
		controllerAs: 'config'
	})
	.when('/order',{
		templateUrl: './app/views/order.html',
		controller: 'orderController',
		controllerAs: 'order'
	})
	.when('/order/add',{
		templateUrl: './app/views/add_order.html',
		controller: 'orderController',
		controllerAs: 'order'
	})
	.when('/order/line',{
		templateUrl: './app/views/lineScreen.html',
		controller: 'LineController',
		controllerAs: 'line'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true); 
	
});