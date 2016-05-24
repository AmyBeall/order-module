angular.module('configCtrl', [])
.controller('configController', function(configFactory, itemFactory, $scope, $sce, $filter){

	var ctrl = this,
		saved = [];

		ctrl.ingredients = [];
		ctrl.categories = [];
		ctrl.vendors = [];
		ctrl.savedMenuItems = [];
		ctrl.menuItems = {};
		ctrl.salads = [];
		ctrl.sandwiches = [];

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
			}
		});
		itemFactory.all().success(function(data){
			saved = data;
			for(item in saved){
				console.log(saved[item].typeList);
				if(saved[item].type == "Salad"){
					ctrl.salads = saved[item].typeList;
					console.log(ctrl.salads);
					};
				if(saved[item].type == "sandwiches"){
					ctrl.sandwiches = saved[item].typeList;
					console.log(ctrl.sandwiches);
					};	
			}
		})	

	ctrl.hideForm = false;

	ctrl.list = [];
	newList = {};

	ctrl.submitItem = function() {
		if (ctrl.item) {
			ctrl.list.push(this.item);
			ctrl.item = '';
			ctrl.hideForm = false;

		}
	};
	ctrl.newForm = function() {
		ctrl.hideForm = true;
	}
	ctrl.removeItem = function(item){
		for(var i = ctrl.list.length - 1; i >= 0; i--){
		    if(ctrl.list[i] == item){
		        ctrl.list.splice(i,1);
		    }
		}
	}

	ctrl.submitIngredients = function(){
		if(ctrl.ingredients.length < 1 ){
			newList.type = "ingredients";
			newList.list = ctrl.list
			configFactory.create(newList)
				.success(function(data) {
	        		ctrl.message = data.message;
	        		console.log(data);
	      		});
		} else {
			angular.forEach(ctrl.list, function(value,index){
				console.log(ctrl.ingredients);
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
	ctrl.submitCategories = function(){
		if(ctrl.categories.length < 1 ){
			newList.type = "categories";
			newList.list = ctrl.list
			configFactory.create(newList)
				.success(function(data) {
	        		ctrl.message = data.message;
	        		console.log(data);
	      		});
		} else {
			angular.forEach(ctrl.list, function(value,index){
				console.log(ctrl.categories);
               	ctrl.categories.push(value);
            })
            ctrl.list = [];
			configFactory.update(categories_id, ctrl.categories)
				.success(function(data) {
	        		console.log(data.message);
	      		});
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
			newList.list = ctrl.list
			configFactory.create(newList)
				.success(function(data) {
	        		ctrl.message = data.message;
	        		console.log(data);
	      		});
		} else {
			angular.forEach(ctrl.list, function(value,index){
				console.log(ctrl.vendors);
               	ctrl.vendors.push(value);
            })
            ctrl.list = [];
			configFactory.update(vendors_id, ctrl.vendors)
				.success(function(data) {
	        		console.log(data.message);
	      		});
		}
	}
	ctrl.removeVendor = function(ingredient){
		for(var i = ctrl.vendors.length - 1; i >= 0; i--){
		    if(ctrl.vendors[i] == ingredient){
		        ctrl.vendors.splice(i,1);
		    }
		}
	}
	ctrl.itemIngredients = [];
	ctrl.toggleSelection = function toggleSelection(ingredient) {
    var idx = ctrl.itemIngredients.indexOf(ingredient);

    // is currently selected
    if (idx > -1) {
      ctrl.itemIngredients.splice(idx, 1);
    }

    // is newly selected
    else {
      ctrl.itemIngredients.push(ingredient);
    }
  };
	// ctrl.submitMenuItem = function(){
	// 	if(Object.keys(ctrl.menuItems).length < 1){
	// 		console.log(ctrl.items.category+'newObject');
	// 		var typeList = {};
	// 		typeList.name = ctrl.items.name;
	// 		typeList.ingredients = ctrl.itemIngredients;
	// 		ctrl.menuItems.typeList = typeList;
	// 		ctrl.menuItems.type = ctrl.items.category;
	// 		console.log(ctrl.menuItems);
	// 		itemFactory.create(ctrl.menuItems)
	// 		.success(function(data) {
 //        		ctrl.message = data.message;
 //        		console.log(data);
 //      		});
	// 	} else {
	// 		for(item in ctrl.menuItems){
	// 			if(item.type == ctrl.items.category){
	// 				console.log(ctrl.items.category+'repeat');
	// 				menuItem_id = item._id;

	// 				configFactory.update(item._id, item.typeList)
	// 			.success(function(data) {
	//         		console.log(data.message);
	//       		});
	// 			} else {
	// 				console.log(ctrl.items.category+'new');
	// 			}
	// 		}
	// 	}
	// };		
});
