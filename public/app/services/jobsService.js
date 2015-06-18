angular.module('jobsService', [])
.factory('jobFactory', function($http, $q){
	// var factory = this;
	// jobs = [];

	// factory.getJobs = function(){
	// 	var deferred = $q.defer();
	// 	var promise1 = $http({
	// 		url:'/api/gitJobs.json',
	// 		method: 'get'
	// 		}).success(function(data){
	// 			for(i in data){
	// 				data[i].company = data[i].company;
	// 				data[i].job_title = data[i].title;
	// 				data[i].location = data[i].location;
	// 				data[i].date = new Date(data[i].created_at);
	// 				data[i].git_url = data[i].url;
	// 				data[i].url = data[i].company_url;
	// 				data[i].description = data[i].description;
	// 				jobs.push(data[i]);
	// 			}
	// 			return data;
	// 		});	
	// 	var promise2 = $http({
	// 		url:'/api/indeedJobs.json',
	// 		method: 'get'
	// 		}).success(function(output){
	// 			data = output.response.results[0].result;
	// 				for(i in data){
	// 					data[i].company = data[i].company[0];
	// 					data[i].job_title = data[i].jobtitle[0];
	// 					data[i].location = data[i].formattedLocationFull[0];
	// 					data[i].date = new Date(data[i].date[0]);
	// 					data[i].indeed_url = data[i].url[0];
	// 					data[i].description = data[i].snippet[0];
	// 					jobs.push(data[i]);
	// 				}	
	// 		});
	// 	$q.all([promise1, promise2]).then(function(results){
	// 		var data = [];
	// 	        angular.forEach(results, function(result) {
	// 	          data = data.concat(result.data);
	// 	          console.log(result.data);
	// 	        });
 //        	return data;
	// 	});
			
	};
	return factory;	
});	