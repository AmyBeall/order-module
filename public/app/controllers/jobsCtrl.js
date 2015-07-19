angular.module('jobsCtrl', [])
.controller('jobsController', function($scope, $sce, $filter, $timeout, jobFactory, paginateService){

	var filtered_jobs = [],
		ctrl = this,
		position = 'developer',
		location = '94109',
		num_per_page = 4;

	ctrl.page_number = 1;

	function get_jobs(position, location){	
		jobFactory.getJobsData(position, location)
		.then(function(response){
			filtered_jobs = $filter('orderBy')(response, '-date');
		}).then(function(){
			ctrl.pages = paginateService.paginate(ctrl.page_number, num_per_page, filtered_jobs);
		});
	}

	get_jobs(position, location);

	ctrl.get_new_jobs = function(position, location){
		ctrl.position = position;
		ctrl.location = location;
		get_jobs(position, location);
	}

	ctrl.renderHtml = function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}

	ctrl.page_down = function(){
		pages = paginateService.page_down(num_per_page, filtered_jobs);
		if(pages != undefined){
			ctrl.page_number -= 1;
			ctrl.pages = pages;
		}
	}

	ctrl.page_up = function(){
		pages = paginateService.page_up(num_per_page, filtered_jobs);
		if(pages != undefined){
			ctrl.page_number += 1;
			ctrl.pages = pages;
		}
	}		
});	