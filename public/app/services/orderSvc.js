angular.module('orderSvc', []) 

.factory('orderFactory', function($http) {
  	// create a new object
	var order = {};
  	// get a single user
	order.get = function(id) { 
		return $http.get('/api/order/' + id);
	};
	  // get all users
	order.all = function() { 
		return $http.get('/api/order/');
	};
	  // create a user
	order.create = function(list) {
		return $http.post('/api/order/', list);
	};
	  // update a user
	order.update = function(id, list) { 
		return $http.put('/api/order/' + id, list);
	};
	return order; 
});