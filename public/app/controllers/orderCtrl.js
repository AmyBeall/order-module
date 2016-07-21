angular.module('orderCtrl', [])
.controller('orderController', function(configFactory, itemFactory, orderFactory, $scope, $sce, $filter, $location){

	var ctrl = this,
		idx;

	ctrl.vendors = [];
	ctrl.listIngredients = [];
	ctrl.categories = [];
	ctrl.menuItems = [];
	ctrl.orderInfo = {};
	ctrl.options = [];
	ctrl.itemIngredients = [];
	ctrl.item = {};
	ctrl.orderItems = [];
	ctrl.orders = [];
	ctrl.customization = " ";
	ctrl.displayOrder = {};
	ctrl.displayOneOrder = false;

	ctrl.showCategories = true;
	ctrl.showOptions = false;
	ctrl.showIngredients = false;
	ctrl.showSubmit = false;
	ctrl.hideform = false;
	ctrl.submitted = false;

	ctrl.init = function(){
		configFactory.all().success(function(data){
			saved = data;
			for(item in saved){
				if(saved[item].type == "ingredients"){
					ingredients_id = saved[item]._id;
					configFactory.get(ingredients_id).success(function(data){
						ctrl.listIngredients = data.list;
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
		})
		orderFactory.all().success(function(data){
			ctrl.orders = data;
			for(order in ctrl.orders){
				items = ctrl.orders[order].item;
				// for(item in items){
				// 	console.log(items[item]);
				// }
			}
	    })
		itemFactory.all().success(function(data){
			ctrl.menuItems = data;
		})
	}
	ctrl.init();

	ctrl.addOrderInfo = function(){
		ctrl.hideform = true;
		if(ctrl.orderItems.length > 0){
			ctrl.showSubmit = true;
		}
	}
	ctrl.editOrderInfo = function(){
		ctrl.hideform = false;
	}
	ctrl.viewOptions = function(category){
		ctrl.category = category;
		for(cat in ctrl.menuItems){
			if(ctrl.menuItems[cat].type === category){
				ctrl.options = ctrl.menuItems[cat].typeList;
			}
		}
		if(category === 'Sandwiches'){
			ctrl.showBread = true;
		}
		ctrl.showOptions = true;
		ctrl.showCategories = false;
	}
	ctrl.viewIngredients = function(name){
		ctrl.name = name;
		for(option in ctrl.options){
			if(ctrl.options[option].name === name){
				ctrl.selectionIngredients = ctrl.options[option].ingredients;
				angular.copy(ctrl.selectionIngredients, ctrl.itemIngredients);
			}
		}
		ctrl.showOptions = false;
		ctrl.showIngredients = true;
	}
	ctrl.toggleIngredient = function(ingredient) {
	    idx = ctrl.itemIngredients.indexOf(ingredient);
	    if (idx > -1) {
	      ctrl.itemIngredients.splice(idx, 1);
	    } else {
	      ctrl.itemIngredients.push(ingredient);
	    }
	};	
	ctrl.addItem = function(){

		modifyIngredients = [];
		angular.copy(ctrl.selectionIngredients, modifyIngredients);
		var ingredients = "";
		for(modIngredient in modifyIngredients){
			for(itemIngredient in ctrl.itemIngredients){
				if(modifyIngredients[modIngredient] === ctrl.itemIngredients[itemIngredient]){
					modifyIngredients.splice(modIngredient, 1);
				}
			}
		}
		if(ctrl.customization != " "){
			ingredients += ",";
		}
		if(modifyIngredients.length <= ctrl.itemIngredients.length){
			for(modIngredient in modifyIngredients){
				ingredients += " no "+modifyIngredients[modIngredient]+",";
			}
		} else if(ctrl.itemIngredients.length < modifyIngredients.length){
			for(ingredient in ctrl.itemIngredients){
				ingredients += " "+ctrl.itemIngredients[ingredient];
			}
			ingredients += " only,";
		} else if(ctrl.itemIngredients.length > 0){
			for(ingredient in ctrl.itemIngredients){
				ingredients += " "+ctrl.itemIngredients[ingredient];
			}
			ingredients += ",";
		}
		if(ctrl.itemBread){
			ingredients += " "+ctrl.itemBread+ " bread";
		}
		ctrl.customization += ingredients;
		ctrl.item.customization = ctrl.customization;
		ctrl.item.ingredients = [];
		angular.copy(ctrl.itemIngredients, ctrl.item.ingredients);
		ctrl.item.ingredients.push(ctrl.itemBread);
		ctrl.item.category = ctrl.category;
		ctrl.item.name = ctrl.name;
		ctrl.orderItems.push(ctrl.item);
		ctrl.item = {};
		ctrl.customization = " ";
		ctrl.showBread = false;
		ctrl.showIngredients = false;
		ctrl.showCategories = true;
		if(Object.keys(ctrl.orderInfo).length > 0){
			ctrl.showSubmit = true;
		}
	}
	ctrl.notAddItem = function(){
		ctrl.showIngredients = false;
		ctrl.showBread = false;
		ctrl.showCategories = true;
	}	
	ctrl.editOrderItems = function(item){
		idx = ctrl.orderItems.indexOf(item);
		ctrl.item = ctrl.orderItems[idx];
		ctrl.customization = " ";
		ctrl.showIngredients = true;
		ctrl.orderItems.splice(idx, 1);
	}
	ctrl.submitOrder = function(){
		ctrl.submitted = true;
		
		formatForMongoDB(function(newOrder){
			
			orderFactory.create(newOrder)
				.success(function(data) {
	        		console.log(data.message);
	        		$location.path( "/order" );
	      		});
		});

		formatForGoogleSheets(function(request){
			orderFactory.sheetCreate(request)
				.success(function(data) {
	        		console.log("Added to Sheet");
	      		});	
		})
	}
	ctrl.viewOrder = function(id){
		for(order in ctrl.orders){
			if(ctrl.orders[order]._id === id){
				ctrl.displayOrder = ctrl.orders[order];
			}
		}
		ctrl.displayOneOrder = true;
	}
	ctrl.displayAllOrders = function(){
		ctrl.displayOneOrder = false;
	}

	function formatForGoogleSheets(callback){

		var request = {},
			value = [],
			item = {};

		request.majorDimension = "ROWS";
		request.values = [];

		item.vendor = ctrl.orderInfo.vendor;
		item.orderNum = ctrl.orderInfo.orderNumber;
		item.company = ctrl.orderInfo.companyName;
		item.contact = ctrl.orderInfo.contact;
		item.address = ctrl.orderInfo.companyAddress;
		item.city = ctrl.orderInfo.city;
		item.phone = ctrl.orderInfo.phone;
		orderDate = ctrl.orderInfo.date;
		item.orderDate = $filter('date')(orderDate, "EEE, M/dd");
		setUpTime = ctrl.orderInfo.time;
		item.setUpTime = $filter('date')(setUpTime, "h:mm a");
		item.headCount = ctrl.orderInfo.headCount;
		item.total = ctrl.orderInfo.total;

		for(eaitem in item){
			value.push(item[eaitem]);
		}
		for(eaitem in ctrl.orderItems){
			value.push(ctrl.orderItems[eaitem].category);
			value.push(ctrl.orderItems[eaitem].name);
			value.push(ctrl.orderItems[eaitem].quantity);
		}
		console.log(value);
		request.values.push(value);
		
		callback(request);
	}
	function formatForMongoDB(callback){

		var newOrder = {},
			item = [];
	
		newOrder.entryDate = new Date();
		newOrder.vendor = ctrl.orderInfo.vendor;
		newOrder.orderNum = ctrl.orderInfo.orderNumber;
		newOrder.company = ctrl.orderInfo.companyName;
		newOrder.contact = ctrl.orderInfo.contact;
		newOrder.address = ctrl.orderInfo.companyAddress;
		newOrder.city = ctrl.orderInfo.city;
		newOrder.phone = ctrl.orderInfo.phone;
		newOrder.orderDate = ctrl.orderInfo.date;
		newOrder.setUpTime = ctrl.orderInfo.time;
		newOrder.headCount = ctrl.orderInfo.headCount;
		newOrder.total = ctrl.orderInfo.total;

		for(eaitem in ctrl.orderItems){
			item.push(ctrl.orderItems[eaitem]);
		}
		newOrder.item = item;

		callback(newOrder);
	}
});