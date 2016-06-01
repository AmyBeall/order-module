angular.module('itemSvc', []) 

.factory('itemFactory', function($http) {

	var itemList = {};
  
	itemList.get = function(id) { 
		return $http.get('/api/menuItem/' + id);
	};
	 
	itemList.all = function() { 
		return $http.get('/api/menuItem/');
	};
	
	itemList.create = function(list) {
		return $http.post('/api/menuItem/', list);
	};
	
	itemList.update = function(id, list) { 
		return $http.put('/api/menuItem/' + id, list);
	};
	return itemList; 
});