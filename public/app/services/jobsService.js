angular.module('jobsService', [])
.factory('jobFactory', function($http){

	var factory = {};
	var git_jobs = {};
	var indeed_jobs = {};

	factory.getGitJobs = function(callback){
		$http({
			url:'/gitJobs.json',
			method: 'get',
			}).success(function(output){
				git_jobs = output;
				callback(git_jobs);	
			});	
	};
	factory.getIndeedJobs = function(callback){
		$http({
			url:'/indeedJobs.json',
			method: 'get',
			}).success(function(output){
				indeed_jobs = output.response.results[0].result;
				callback(indeed_jobs);	
			});
	}
	return factory;	
});	