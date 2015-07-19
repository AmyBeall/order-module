angular.module('jobsService', [])
.factory('jobFactory', function($q, $filter, gitHubAPI, indeedAPI){
	var factory = this,
		indeedAPIdata,
		gitAPIdata,
		newData;
	
		factory.getJobsData = function(position, location){
			var filtered_jobs = [];

			gitAPIdata = gitHubAPI(position, location)
			.then(function(data){
				
				newData = data.map(function(datum, i){
					datum = {
						company : datum.company,
						job_title : datum.title,
						location : datum.location,
						date : new Date(datum.created_at),
						git_url : datum.url,
						url : datum.company_url,
						description : datum.description
						}
					filtered_jobs.push(datum);	
				});
				return newData;
			});	
			
			indeedAPIdata = indeedAPI(position, location)
			.then(function(data){
				var newData = data.map(function(datum, i){
					var datum = {
						company : datum.company,
						job_title : datum.jobtitle,
						location : datum.formattedLocation,
						date : new Date(datum.date),
						indeed_url : datum.url,
						url : datum.url,
						description : datum.snippet
						}
					filtered_jobs.push(datum);	
				});
				return newData;
			})
			
			return $q.all([gitAPIdata, indeedAPIdata])
					.then(function(results){
						return filtered_jobs;
					}, function(error){
						console.log(error);
					});
		}	
	return factory;	
});	