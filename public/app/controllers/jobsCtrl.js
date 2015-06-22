angular.module('jobsCtrl', [])
.controller('jobsController', function($scope, $sce, $filter, $q, $http){

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
			addPages(5,10);
		} else if (count == 3) {
			addPages(10,15);
		} else if (count == 4) {
			addPages(15,20);
		} else if (count == 5) {
			addPages(20,25);
		} else if (count == 6) {
			addPages(25,30);
		} else if (count == 7) {
			addPages(30,35);
		} else if (count == 8) {
			addPages(35,40);
		} else if (count == 9) {
			addPages(40,45);
		} else if (count == 10) {
			addPages(45,50);
		} else if (count == 11) {
			addPages(50,55);
		} else if (count == 12) {
			addPages(55,60);
		} 
	}
	function addPages(start, finish){
		$scope.pages = [];
		for(var i = start; i < finish; i++){ 
				$scope.pages.push($scope.filtered_jobs[i]);
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
				addPages(0,5);
			}	
		});
	}
	
	getJobs();	

});	