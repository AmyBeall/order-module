angular.module('usersJobsCtrl', [])
.controller('usersJobsController', function(usersJobsFactory, $sce, $filter){

	var ctrl = this,
		jobs = {};

	usersJobsFactory.all().success(function(data){
		ctrl.jobs = data;
	});

	ctrl.renderHtml = function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}

});
