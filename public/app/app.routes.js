angular.module('app.routes', ['ngRoute']) 
.config(function($routeProvider, $locationProvider){

	$routeProvider

	.when('/',{
		templateUrl: './app/views/job_board.html',
		controller: 'jobsController',
		controllerAs: 'jobs'
	})
	.when('/usersJobs',{
		templateUrl: './app/views/users_jobs.html',
		controller: 'usersJobsController',
		controllerAs: 'usersJobs'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true); 
	
});