angular.module('configCtrl', [])
.controller('configController', function(
	configFactory, itemFactory, $scope, $sce, $filter){

	var ctrl = this,
		saved = [],
		newList = {},
		newItem = {},
		newItems = [];
	ctrl.ingredients = [];
	ctrl.categories = [];
	ctrl.vendors = [];
	ctrl.items = [];
	ctrl.breads = [];
	ctrl.menuItems = [];
	ctrl.hideForm = false;
	ctrl.list = [];
	ctrl.breadList = [];
	ctrl.itemIngredients = [];
	ctrl.submitted = false;

	configFactory.all().success(function(data){
		saved = data;
		for(item in saved){
			if(saved[item].type == "ingredients"){
				ingredients_id = saved[item]._id;
				configFactory.get(ingredients_id).success(function(data){
					ctrl.ingredients = data.list;
				});
			}
			if(saved[item].type == "categories"){
				categories_id = saved[item]._id;
				configFactory.get(categories_id).success(function(data){
					ctrl.categories = data.list;
				});
			}
			if(saved[item].type == "vendors"){
				vendors_id = saved[item]._id;
				configFactory.get(vendors_id).success(function(data){
					ctrl.vendors = data.list;
				});
			}
			if(saved[item].type == "breads"){
				breads_id = saved[item]._id;
				configFactory.get(breads_id).success(function(data){
					ctrl.breads = data.list;
				});
			}
		}
	});

	itemFactory.all().success(function(data){
		ctrl.menuItems = data;
	})	

	ctrl.newForm = function() {
		ctrl.hideForm = true;
	}
	ctrl.submitItem = function() {
		if (ctrl.item) {
			ctrl.list.push(this.item);
			ctrl.item = '';
			ctrl.hideForm = false;

		}
	};
	ctrl.removeItem = function(item){
		var i;
		var item = item;
		for(i = 0; i < ctrl.list.length; i++){
			console.log(ctrl.list[i]);
			console.log(item);
		    if(ctrl.list[i] == item){
		        ctrl.list.splice(i,1);
		    }
		}
	}
	ctrl.submitBreadItem = function() {
		if (ctrl.breadItem) {
			ctrl.breadList.push(ctrl.breadItem);
			ctrl.breadItem = '';
			ctrl.hideForm = false;

		}
	};

	ctrl.submitIngredients = function(){
		ctrl.submitted = true;
		if(ctrl.ingredients.length < 1 ){
			newList.type = "ingredients";
			newList.list = ctrl.list
			configFactory.create(newList)
				.success(function(data) {
	        		ctrl.message = data.message;
	      		});
		} else {
			angular.forEach(ctrl.list, function(value,index){
               	ctrl.ingredients.push(value);
            })
            ctrl.list = [];
			configFactory.update(ingredients_id, ctrl.ingredients)
				.success(function(data) {
	        		console.log(data.message);
	      		});
		}
	}

	ctrl.removeIngredient = function(ingredient){

		for(var i = ctrl.ingredients.length - 1; i >= 0; i--){

		    if(ctrl.ingredients[i] == ingredient){
		        ctrl.ingredients.splice(i,1);
		    }
		}
	}
	ctrl.submitBreads = function(){
		ctrl.submitted = true;
		if(ctrl.breads.length < 1 ){
			newList.type = "breads";
			newList.list = ctrl.breadList
			configFactory.create(newList)
				.success(function(data) {
	        		ctrl.message = data.message;
	      		});
		} else {
			angular.forEach(ctrl.breadList, function(value,index){
				console.log(ctrl.breads);
               	ctrl.breads.push(value);
            })
            ctrl.breadList = [];
			configFactory.update(breads_id, ctrl.breads)
				.success(function(data) {
	        		console.log(data.message);
	      		});
		}
	}

	ctrl.removeBread = function(bread){

		for(var i = ctrl.breads.length - 1; i >= 0; i--){

		    if(ctrl.breads[i] == bread){
		        ctrl.breads.splice(i,1);
		    }
		}
	}

	ctrl.submitCategories = function(){

		ctrl.submitted = true;
		if(ctrl.categories.length < 1 ){
			newList.type = "categories";
			newList.list = ctrl.list;

			configFactory.create(newList)
				.success(function(data) {
	        		ctrl.message = data.message;
	      		});
		} else {

			angular.forEach(ctrl.list, function(value,index){
				console.log(ctrl.categories);
               	ctrl.categories.push(value);
            })
            
			configFactory.update(categories_id, ctrl.categories)
				.success(function(data) {
	        		console.log(data.message);
	      		});
	      	ctrl.list = [];	
		}
	}

	ctrl.removeCategory = function(ingredient){

		for(var i = ctrl.categories.length - 1; i >= 0; i--){

		    if(ctrl.categories[i] == ingredient){
		        ctrl.categories.splice(i,1);
		    }
		}
	}

	ctrl.submitVendors = function(){

		if(ctrl.vendors.length < 1 ){
			newList.type = "vendors";
			newList.list = ctrl.list;

			configFactory.create(newList)
				.success(function(data) {
	        		ctrl.message = data.message;
	      		});
		} else {

			angular.forEach(ctrl.list, function(value,index){
				console.log(ctrl.vendors);
               	ctrl.vendors.push(value);
            })
            
			configFactory.update(vendors_id, ctrl.vendors)
				.success(function(data) {
	        		console.log(data.message);
	      		});
	      	ctrl.list = [];	
		}
	}

	ctrl.removeVendor = function(ingredient){

		for(var i = ctrl.vendors.length - 1; i >= 0; i--){
		    
		    if(ctrl.vendors[i] == ingredient){
		        ctrl.vendors.splice(i,1);
		    }
		}
	}
	
	ctrl.toggleSelection = function(ingredient) {
	    var idx = ctrl.itemIngredients.indexOf(ingredient);
	    if (idx > -1) {
	      ctrl.itemIngredients.splice(idx, 1);
	    } else {
	      ctrl.itemIngredients.push(ingredient);
	    }
	};
	ctrl.addMenuItem = function(){
		newItem = {};
		item = {};
		item.name = ctrl.items.name;
		item.ingredients = ctrl.itemIngredients;
		newItem.typeList = [];
		exists = "";
		isthere = "";
		function addNew(item){
			newItem.type = ctrl.items.category;
			newItem.typeList.push(item);
			newItems.push(newItem);
		}

		if(Object.keys(ctrl.menuItems).length < 1){
			addNew(item);
			ctrl.menuItems.push(newItem);
		} else {
			for(index in ctrl.menuItems){
				if(ctrl.menuItems[index].type === ctrl.items.category){
					exists = index;
				}
			}
			for(index in newItems){
				if(newItems[index].type === ctrl.items.category){
					isthere = index;
				}
			}
			if(isthere != ""){
				if(newItems[isthere].type === ctrl.items.category){
					newItems[isthere].typeList.push(item);
				} 
			} else if(exists != ""){
				if(ctrl.menuItems[exists].type === ctrl.items.category){
					ctrl.menuItems[exists].typeList.push(item);
					if(isthere === ""){
						addNew(item);
					}
				} 
			} else {
				addNew(item);
				ctrl.menuItems.push(newItem);
			}

		}
		exists = "";
		isthere = "";
		ctrl.items.category = '';
		ctrl.items.name = '';
		ctrl.itemIngredients = [];
		ctrl.hideForm = false;
	};		
	ctrl.addMenuItems = function(){

		ctrl.submitted = true;
		exists ="";
		savedMenuItems = [];
		
		itemFactory.all().success(function(data){

			savedMenuItems = data;
			
			function addNewItems(list){
				itemFactory.create(list).success(function(data){
					console.log(data);
				})	
			}
			for(menuItem in newItems){
				if(Object.keys(savedMenuItems).length < 1){
					addNewItems(newItems[menuItem]);				
				} else {
					for(index in savedMenuItems){
						if(savedMenuItems[index].type === newItems[menuItem].type){
							exists = index;
						}
					}
					if(exists != ""){
						if(savedMenuItems[exists].type === newItems[menuItem].type){
							menu_id = savedMenuItems[exists]._id;
							itemFactory.update(menu_id, newItems[menuItem].typeList)
								.success(function(data) {
					        		console.log(data.message);
					      		});
						} 
					} else {
						addNewItems(newItems[menuItem]);
					}
				}
			}
		})
	};
	ctrl.removeMenuItem = function(member){
		console.log(member);
	}		
})