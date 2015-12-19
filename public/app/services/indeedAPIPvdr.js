angular.module('indeedAPIPvdr', [])
.provider('indeedAPI', function indeedAPIProvider(){
	
	var indeed = 'http://api.indeed.com',
		path = '/ads/apisearch?publisher=9067697284373618',
		ip = '&userip=74.61.150.47',
		agent = '&useragent=Mozilla/%2F4.0%28Firefox%29&v=2';

	this.$get = function($http){
		return function(description, location){
			return $http.get(indeed+path+'&q='+description+'&l='+location+'&limit=50'+ip+agent, 
						{ transformResponse: function(data){
	                        var x2js = new X2JS();
	                        var json = x2js.xml_str2json( data );
	                        return json;
                        }
                    })
					.then(function(response){
						return response.data.response.results.result;
					});
		}	
	}
});