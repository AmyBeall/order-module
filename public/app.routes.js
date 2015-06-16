angular.module('app.routes', ['ngRoute']) 
.config(function($routeProvider){

	$routeProvider

	.when('/',{
		templateUrl: './app/views/job_board.html'
	})
	// .when('/dashboard/',{
	// 	templateUrl: './angular/views/dashboard.html',
	// 	controller: 'messagesController'
	// })
	// .when('/board/:id',{
	// 	templateUrl: './angular/views/board.html',
	// 	controller: 'topicsController',
	// 	resolve: topicsController.one_topic
	// })
	// .when('/user/:id',{
	// 	templateUrl: './angular/views/user.html'
	// })
	// .when('/logout',{
	// 	redirectTo: '/'
	// })
	.otherwise({
		redirectTo: '/'
	});
});