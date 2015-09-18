angular.module('paginateSvc', [])
.service('paginateService', function(){

	addPages = function(start, finish, array){
		var pages = [];
		for(var i = start; i < finish; i++){ 
			if(array[i] != undefined){
				pages.push(array[i]);
			}
		}
		return pages;
	};

	return function(page, num_per_page, array){
		var high_index = num_per_page * page,
			low_index = high_index - num_per_page;
		
		return addPages(low_index,high_index,array); 
	};

});	