angular.module('app.routes', ['ngRoute']) 
.config(function($routeProvider){

	$routeProvider

	.when('/',{
		templateUrl: './app/views/job_board.html',
	})
	.otherwise({
		redirectTo: '/'
	});
});