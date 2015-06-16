angular.module('jobsService', [])
.factory('jobFactory', function($http){

	var factory = {};
	var git_jobs = {};
	var indeed_jobs = {};

	factory.getGitJobs = function(callback){
		$http({
			url:'/api/gitJobs.json',
			method: 'get'
			}).success(function(data){
				for(i in data){
					data[i].company = data[i].company;
					data[i].job_title = data[i].title;
					data[i].location = data[i].location;
					data[i].date = new Date(data[i].created_at);
					data[i].git_url = data[i].url;
					data[i].url = data[i].company_url;
					data[i].description = data[i].description;
				};
				git_jobs = data;
				callback(git_jobs);
			});	
	};
	factory.getIndeedJobs = function(callback){
		$http({
			url:'/api/indeedJobs.json',
			method: 'get'
			}).success(function(output){
				data = output.response.results[0].result;
					for(i in data){
						data[i].company = data[i].company[0];
						data[i].job_title = data[i].jobtitle[0];
						data[i].location = data[i].formattedLocationFull[0];
						data[i].date = new Date(data[i].date[0]);
						data[i].indeed_url = data[i].url[0];
						data[i].description = data[i].snippet[0];
					};
				indeed_jobs = data;	
				callback(indeed_jobs);	
			});
	}
	return factory;	

});	