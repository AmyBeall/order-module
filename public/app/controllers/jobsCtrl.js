angular.module('jobsCtrl', [])
.controller('jobsController', function($scope, jobFactory, $location, $sce, $filter, $rootScope, $q, $http){

	var jobs = [],
		count = 1;
	$scope.filtered_jobs = [];
	$scope.pages = [];

	$scope.count_down = function(){
		if (count > 1 && count <= 12){
			count = count - 1;
			paginate();
		}
	}
	$scope.count_up = function(){
		if (count >= 1 && count < 12){
			count = count + 1;
			paginate();
		}
	}
	function paginate(){
		if (count == 2) {
			$scope.pages = [];
			for(var i = 5; i <10; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 3) {
			$scope.pages = [];
			for(var i = 10; i <15; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 4) {
			$scope.pages = [];
			for(var i = 15; i <20; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 5) {
			$scope.pages = [];
			for(var i = 20; i <25; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 6) {
			$scope.pages = [];
			for(var i = 25; i <30; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 7) {
			$scope.pages = [];
			for(var i = 30; i <35; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 8) {
			$scope.pages = [];
			for(var i = 35; i <40; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 9) {
			$scope.pages = [];
			for(var i = 40; i <45; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 10) {
			$scope.pages = [];
			for(var i = 45; i <50; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 11) {
			$scope.pages = [];
			for(var i = 50; i <55; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} else if (count == 12) {
			$scope.pages = [];
			for(var i = 55; i <60; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
			}
		} 
	}
	$scope.renderHtml = function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}

	getJobs = function(){
		var promise1 = $http({
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
					jobs.push(data[i]);
				}
				return data.location;
			});	
		var promise2 = $http({
			url:'/api/indeedJobs.json',
			method: 'get'
			}).success(function(output){

				var data = output.response.results[0].result;
					for(i in data){
						data[i].company = data[i].company[0];
						data[i].job_title = data[i].jobtitle[0];
						data[i].location = data[i].formattedLocationFull[0];
						data[i].date = new Date(data[i].date[0]);
						data[i].indeed_url = data[i].url[0];
						data[i].description = data[i].snippet[0];
						jobs.push(data[i]);
					}
				var output = data;	
				return output;		
			});
		$q.all([promise1, promise2]).then(function(results){
			$scope.filtered_jobs = $filter('orderBy')(jobs, '-date');
		}).then(function(){
			if (count == 1){
				for(var i = 0; i <5; i++){ 
					$scope.pages.push($scope.filtered_jobs[i]);
				}
			}	
		});
	}
	
	getJobs();	

});	