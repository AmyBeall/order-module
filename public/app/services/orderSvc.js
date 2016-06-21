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
	order.create = function(order) {
		return $http.post('/api/order/', order);
	};
	order.sheetCreate = function(order){
		return $http.post('/sheets/order/', order);
	}
	  // update a user
	order.update = function(id, order) { 
		return $http.put('/api/order/' + id, order);
	};
	return order; 
});