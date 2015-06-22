angular.module('jobsService', [])
.factory('jobFactory', function($http, $q){
	var factory = this,
		filtered_jobs = [];

		var gitAPI = $http({
			url:'/api/gitJobs.json',
			method: 'get'
			}).then(function(response){
				return response.data;
			})
		gitAPIdata = gitAPI.then(function(data){
			for(i in data){
				data[i].company = data[i].company;
				data[i].job_title = data[i].title;
				data[i].location = data[i].location;
				data[i].date = new Date(data[i].created_at);
				data[i].git_url = data[i].url;
				data[i].url = data[i].company_url;
				data[i].description = data[i].description;
				filtered_jobs.push(data[i]);
				}
			return data;
			});	
		
		var indeedAPI = $http({
			url:'/api/indeedJobs.json',
			method: 'get'
			}).then(function(response){
				return response.data.response.results[0].result;
			})
		indeedAPIdata = indeedAPI.then(function(data){
			for(i in data){
				data[i].company = data[i].company[0];
				data[i].job_title = data[i].jobtitle[0];
				data[i].location = data[i].formattedLocationFull[0];
				data[i].date = new Date(data[i].date[0]);
				data[i].indeed_url = data[i].url[0];
				data[i].description = data[i].snippet[0];
				filtered_jobs.push(data[i]);
			}
			return data;
		})
	
		factory.getJobsData = $q.all([gitAPIdata, indeedAPIdata]).then(function(results){
			filtered_jobs = filtered_jobs;
			return filtered_jobs;
		})
		
	return factory;	
});	