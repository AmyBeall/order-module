angular.module('usersJobsSvc', []) 

.factory('usersJobsFactory', function($http) {
  	// create a new object
	var usersJobs = {};
  	// get a single user
	// usersJobs.get = function(id) { 
	// 	return $http.get('/api/users/' + id);
	// };
	  // get all users
	usersJobs.all = function() { 
		return $http.get('/api/jobs/');
	};
	  // create a user
	usersJobs.create = function(jobData) { 
		return $http.post('/api/jobs/',jobData);
	};
	  // update a user
	// usersJobs.update = function(id, userData) { 
	// 	return $http.put('/api/users/' + id, userData);
	// };
	  // delete a user
	// usersJobs.delete = function(id) { 
	// 	return $http.delete('/api/users/' + id);
	// };
	  // return our entire usersJobs object
	return usersJobs; 
});