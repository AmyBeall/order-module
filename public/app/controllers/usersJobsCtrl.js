angular.module('usersJobsCtrl', [])
.controller('usersJobsController', function(usersJobsFactory, $sce, $filter){

	var ctrl = this,
		jobs = {};

	usersJobsFactory.all().success(function(data){
		ctrl.jobs = data;
		console.log(ctrl.jobs);
	});
	
	ctrl.renderHtml = function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}

});
