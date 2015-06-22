angular.module('jobsCtrl', [])
.controller('jobsController', function($scope, $sce, $filter, jobFactory){

	var filtered_jobs = [],
		count = 1;
	$scope.pages = [];

	$scope.renderHtml = function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}
	$scope.count_down = function(){
		if (count > 1 && count <= 12){
			count -= 1;
			paginate();
		}
	}
	$scope.count_up = function(){
		if (count >= 1 && count < 12){
			count += 1;
			paginate();
		}
	}
	function paginate(){
		if (count == 1){
			addPages(0,5);
		} else if(count == 2) {
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
				$scope.pages.push(filtered_jobs[i]);
			}
	}

	(function getJobs(){
		jobFactory.getJobsData.then(function(response){
			filtered_jobs = $filter('orderBy')(response, '-date');
		}).then(function(){
			addPages(0,5);
		});;
	})();

});	