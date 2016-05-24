angular.module('itemSvc', []) 

.factory('itemFactory', function($http) {
  	// create a new object
	var itemList = {};
  	// get a single user
	itemList.get = function(id) { 
		return $http.get('/api/menuItem/' + id);
	};
	  // get all users
	itemList.all = function() { 
		return $http.get('/api/menuItem/');
	};
	  // create a user
	itemList.create = function(list) {
		return $http.post('/api/menuItem/', list);
	};
	  // update a user
	itemList.update = function(id, list) { 
		return $http.put('/api/menuItem/' + id, list);
	};
	return itemList; 
});