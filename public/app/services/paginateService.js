angular.module('paginateService', [])
.service('paginateService', function(){
	
	var service = this,
		page = 1,

		addPages = function(start, finish, array){
			pages = [];
			for(var i = start; i < finish; i++){ 
				if(array[i] != undefined){
					pages.push(array[i]);
				}
			}
			return pages;
		};

	service.paginate = function(page, num_per_page, array){
		var high_index = num_per_page * page;
		var low_index = high_index - num_per_page;
		
		return addPages(low_index,high_index,array); 
	};

	service.page_down = function(num_per_page, array){
		var last_page = Math.ceil(array.length/num_per_page);
		
		if (page > 1 && page <= last_page){
			page -= 1;
			
			return service.paginate(page, num_per_page, array);
		}
	};

	service.page_up = function(num_per_page, array){
		var last_page = Math.ceil(array.length/num_per_page);
		if (page >= 1 && page < last_page){
			page += 1;
		
			return service.paginate(page, num_per_page, array);
		}
	};
});	