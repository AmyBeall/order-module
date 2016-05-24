angular.module('configSvc', []) 

.factory('configFactory', function($http) {
  	// create a new object
	var configList = {};
  	// get a single user
	configList.get = function(id) { 
		return $http.get('/api/configure/' + id);
	};
	  // get all users
	configList.all = function() { 
		return $http.get('/api/configure/');
	};
	  // create a user
	configList.create = function(list) {
		return $http.post('/api/configure/', list);
	};
	  // update a user
	configList.update = function(id, list) { 
		return $http.put('/api/configure/' + id, list);
	};
	return configList; 
});