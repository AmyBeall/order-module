angular.module('gitAPIProvider', [])
.provider('gitHubAPI', function gitHubAPIProvider(){
	var gitHub = 'http://jobs.github.com/positions.json',
		page = '0';

	this.$get = function($http, $q){
		return function(description, location){
			var MAX_REQUESTS = 3,
          	counter = 1,
          	results = $q.defer();
       
			var request = function(){
				$http.get(gitHub+'?description='+description+'&location='+location+'&page='+page)
				.then(function(response){
					console.log(response);
					if(response.data.length == 0){
						 if (counter < MAX_REQUESTS) {
						 	console.log('resent git request');
				              request();
				              counter++;
				            } else {
					            results.reject("Could not load after multiple tries");
				            }
						
					}
					else {
						results.resolve(response.data);
					}
				});	
			};

      		request();

      		return results.promise;

		}	
	}
});