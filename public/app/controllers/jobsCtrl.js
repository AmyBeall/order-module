angular.module('jobsCtrl', [])
.controller('jobsController', function($scope, jobFactory, $location, $sce, $filter, $rootScope, $q, $http){

	$scope.filtered_jobs = [];
	$scope.jobs1 = [];
	$scope.jobs2 = [];
	$scope.jobs3 = [];
	$scope.jobs4 = [];
	$scope.jobs5 = [];
	$scope.jobs6 = [];
	$scope.jobs7 = [];
	$scope.jobs8 = [];
	$scope.jobs9 = [];
	$scope.jobs10 = [];
	$scope.jobs11 = [];
	$scope.jobs12 = [];
	$scope.pages = $scope.jobs1;
	$scope.num_limit = 11;

	count = 1;
	$scope.count_down = function(){
		if (count > 1 && count <= 12){
			count = count - 1;
			$scope.paginate();
		}
	}
	$scope.count_up = function(){
		if (count >= 1 && count < 12){
			count = count + 1;
			$scope.paginate();
		}
	}
	$scope.renderHtml = function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}
	$scope.paginate = function(){
		if (count == 1){
			$scope.pages = $scope.jobs1;
		} else if (count == 2) {
			$scope.pages = $scope.jobs2;
		} else if (count == 3) {
			$scope.pages = $scope.jobs3;
		} else if (count == 4) {
			$scope.pages = $scope.jobs4;
		} else if (count == 5) {
			$scope.pages = $scope.jobs5;
		} else if (count == 6) {
			$scope.pages = $scope.jobs6;
		} else if (count == 7) {
			$scope.pages = $scope.jobs7;
		} else if (count == 8) {
			$scope.pages = $scope.jobs8;
		} else if (count == 9) {
			$scope.pages = $scope.jobs9;
		} else if (count == 10) {
			$scope.pages = $scope.jobs10;
		} else if (count == 11) {
			$scope.pages = $scope.jobs11;
		} else if (count == 12) {
			$scope.pages = $scope.jobs12;
		} 
	};
	var jobs = [];
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
				return data;
			});	
		var promise2 = $http({
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
						jobs.push(data[i]);
					}
				return data;		
			});
		$q.all([promise1, promise2]).then(function(results){
			$scope.filtered_jobs = $filter('orderBy')(jobs, '-date');
			console.log($scope.filtered_jobs);	
		}).then(function(){
			for (i in $scope.filtered_jobs){
				if( i < 5 ){
					$scope.jobs1.push($scope.filtered_jobs[i]);
					console.log($scope.jobs1);
				}
				else if(i >= 5 && i < 10){
					$scope.jobs2.push($scope.filtered_jobs[i]);
				}
				else if(i >= 10 && i < 15){
					$scope.jobs3.push($scope.filtered_jobs[i]);
				}
				else if(i >= 15 && i < 20){
					$scope.jobs4.push($scope.filtered_jobs[i]);
				}
				else if(i >= 20 && i < 25){
					$scope.jobs5.push($scope.filtered_jobs[i]);
				}
				else if(i >= 25 && i < 30){
					$scope.jobs6.push($scope.filtered_jobs[i]);
				}
				else if(i >= 30 && i < 35){
					$scope.jobs7.push($scope.filtered_jobs[i]);
				}
				else if(i >= 35 && i < 40){
					$scope.jobs8.push($scope.filtered_jobs[i]);
				}
				else if(i >= 40 && i < 45){
					$scope.jobs9.push($scope.filtered_jobs[i]);
				}
				else if(i >= 45 && i < 50){
					$scope.jobs10.push($scope.filtered_jobs[i]);
				}
				else if(i >= 50 && i < 55){
					$scope.jobs11.push($scope.filtered_jobs[i]);
				}
				else if(i >= 55 && i < 60){
					$scope.jobs12.push($scope.filtered_jobs[i]);
				}
			}	
		});
	}
	
	getJobs();	

});	