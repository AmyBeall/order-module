angular.module('jobsService', [])
.factory('jobFactory', function($http, $q){

	var factory = this,
		filtered_jobs = [];
		
		var gitAPI = $http({
			url:'/api/gitJobs.json',
			method: 'get',
			cache: true 
		}).then(function(response){
			return response.data;
		});
		gitAPIdata = gitAPI.then(function(data){
			if(data.length == 0){
				throw{
					success:false,
					reason: 'no results'
				}
			}
			var newData = data.map(function(datum, i){
				var datum = {
					company : datum.company,
					job_title : datum.title,
					location : datum.location,
					date : new Date(datum.created_at),
					git_url : datum.url,
					url : datum.company_url,
					description : datum.description
					}
				filtered_jobs.push(datum);	
				return datum;
			});
			return newData;
		});	
		
		var indeedAPI = $http({
			url:'/api/indeedJobs.json',
			method: 'get',
			cache: true 
			}).then(function(response){
				return response.data.response.results[0].result;
			})
		indeedAPIdata = indeedAPI.then(function(data){
			var newData = data.map(function(datum, i){
				var datum = {
					company : datum.company[0],
					job_title : datum.jobtitle[0],
					location : datum.formattedLocationFull[0],
					date : new Date(datum.date[0]),
					indeed_url : datum.url[0],
					url : datum.url[0],
					description : datum.snippet[0]
					}
				filtered_jobs.push(datum);	
				return datum;
			});
			return newData;
		})
	
		factory.getJobsData = $q.all([gitAPIdata, indeedAPIdata]).then(function(results){
			filtered_jobs = filtered_jobs;
			return filtered_jobs;
		}, function(error){
			console.log(error);
		})
	return factory;	
});