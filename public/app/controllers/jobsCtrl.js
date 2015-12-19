angular.module('jobsCtrl', [])
.controller('jobsController', function($scope, $sce, $filter, usersJobsFactory, jobFactory, paginateService){

	var ctrl = this,
		filtered_jobs = [],
		position = 'developer',
		location = '94109',
		num_per_page = 4,

		get_jobs = function(position, location){
			ctrl.processing = true;
			jobFactory.getJobsData(position, location)
			.then(function(response){
				filtered_jobs = $filter('orderBy')(response, '-date');
			}).then(function(){
				ctrl.pages = paginateService(ctrl.pg_num, num_per_page, filtered_jobs);
				ctrl.processing = false;
				ctrl.last_page = Math.ceil(filtered_jobs.length/num_per_page);
			});
		};

	get_jobs(position, location);

	ctrl.pg_num = 1;

	ctrl.get_new_jobs = function(position, location){
		ctrl.position = position;
		ctrl.location = location;
		ctrl.pg_num = 1;
		get_jobs(position, location);
	}
	ctrl.saveJob = function(job) {

    	ctrl.message = '';

		usersJobsFactory.create(job)
			.success(function(data) {
        		ctrl.message = data.message;
        		console.log(data.message);
      		});
      	job.checked = true;
      	$scope.checked = "";
	}
	ctrl.renderHtml = function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}

	ctrl.page_down = function(){
		if(ctrl.pg_num > 1){
			ctrl.pg_num -= 1;
			ctrl.pages = paginateService(ctrl.pg_num, num_per_page, filtered_jobs);
		}
	}

	ctrl.page_up = function(){
		if(ctrl.pg_num < ctrl.last_page){
			ctrl.pg_num += 1;
			ctrl.pages = paginateService(ctrl.pg_num, num_per_page, filtered_jobs);
		}
	}
});
