angular.module('orderCtrl', [])
.controller('orderController', function(configFactory, itemFactory, orderFactory, $scope, $sce, $filter, $location){

	var ctrl = this,
		idx;

	ctrl.ingredients = [];
	ctrl.categories = [];
	ctrl.vendors = [];
	ctrl.breads = [];

	ctrl.showCategories = true;

	ctrl.displayOneOrder = false;
	ctrl.hideform = false;
	ctrl.showOptions = false;
	ctrl.showIngredients = false;
	ctrl.showSubmit = false;
	ctrl.submitted = false;

	ctrl.init = function(){
		
		configFactory.all().success(function(data){
			
			var lists = ["categories", "vendors", "ingredients", "breads"];
			
			for(item in data){
				
				for(configList in lists){
					
					if(data[item].type == "breads"){
						
						var id = data[item]._id;
						
						configFactory.get(id).success(function(data){
							ctrl["breads"] = data.list;
							console.log("breads");
						});
					}
				}
			}
		})
		orderFactory.all().success(function(data){
			
			ctrl.orders = data;
			
			for(order in ctrl.orders){
				
				items = ctrl.orders[order].item;
			}
	    })
		itemFactory.all().success(function(data){
			
			ctrl.menuItems = data;
		})
	}
	ctrl.init();

	ctrl.addOrderInfo = function(){
		
		ctrl.hideform = true;
		
		if(ctrl.orderItems.length > 0) ctrl.showSubmit = true;
	}
	ctrl.editOrderInfo = function(){
		
		ctrl.hideform = false;
	}
	ctrl.viewOptions = function(category){

		ctrl.category = category;
		ctrl.showOptions = true;
		ctrl.showCategories = false;

		if(category === 'Sandwiches') ctrl.showBread = true;

		for(cat in ctrl.menuItems){
			if(ctrl.menuItems[cat].type === category){
				ctrl.options = ctrl.menuItems[cat].typeList;
			}
		}
	}
	ctrl.viewIngredients = function(name){
		
		ctrl.name = name;
		ctrl.itemIngredients = [];
		ctrl.showOptions = false;
		ctrl.showIngredients = true;

		for(option in ctrl.options){

			if(ctrl.options[option].name === name){

				ctrl.selectionIngredients = ctrl.options[option].ingredients;
				angular.copy(ctrl.selectionIngredients, ctrl.itemIngredients);
			}
		}
	}
	ctrl.toggleIngredient = function(ingredient) {

		var ing = ctrl.itemIngredients,
			idx = ing.indexOf(ingredient);

	    idx > -1 ? ing.splice(idx, 1) : ing.push(ingredient);
	};	
	ctrl.addItem = function(){

		var ingredientStr = "",
			modifyIngredients = [],
			item = {
				category : ctrl.category,
				name : ctrl.name,
				ingredients : []
			};

		angular.copy(ctrl.selectionIngredients, modifyIngredients);
		angular.copy(ctrl.itemIngredients, item.ingredients);
		
		if(ctrl.customization) ingredientStr += ctrl.customization+",";

		for(mod in modifyIngredients){
			
			for(ingredient in item.ingredients){

				if(modifyIngredients[mod] === item.ingredients[ingredient]){
					
					modifyIngredients.splice(mod, 1);
				}
			}
		}
		if(modifyIngredients.length <= item.ingredients.length){
			
			for(modIngredient in modifyIngredients){
				
				ingredientStr += " no "+modifyIngredients[modIngredient]+",";
			}
		} else {
					
			for(ingredient in item.ingredients){
				
				ingredientStr += " "+item.ingredients[ingredient];
			}
			if(modifyIngredients.length > item.ingredients.length) ingredientStr += " only, ";
			if(item.ingredients.length > 0) ingredientStr += ", ";
		}

		if(ctrl.itemBread) ingredientStr += " "+ctrl.itemBread+ " bread";

		item.customization += ingredientStr;
		item.ingredients.push(ctrl.itemBread);
		
		ctrl.orderItems.push(item);
		
		ctrl.customization = " ";
		ctrl.showCategories = true;
		ctrl.showBread = false;
		ctrl.showIngredients = false;

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

		var idx = ctrl.orderItems.indexOf(item);

		ctrl.customization = " ";
		ctrl.showIngredients = true;
		ctrl.item = ctrl.orderItems[idx];

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

		ctrl.displayOneOrder = true;

		for(order in ctrl.orders){

			if(ctrl.orders[order]._id === id){

				ctrl.displayOrder = ctrl.orders[order];
			}
		}
	}
	ctrl.displayAllOrders = function(){
		
		ctrl.displayOneOrder = false;
	}

	function formatForGoogleSheets(callback){

		var request = {},
			value = [],
			item = {},
			orderDate = ctrl.orderInfo.date,
			setUpTime = ctrl.orderInfo.time;

		request.majorDimension = "ROWS";
		request.values = [];

		item.vendor = ctrl.orderInfo.vendor;
		item.orderNum = ctrl.orderInfo.orderNumber;
		item.company = ctrl.orderInfo.companyName;
		item.contact = ctrl.orderInfo.contact;
		item.address = ctrl.orderInfo.companyAddress;
		item.city = ctrl.orderInfo.city;
		item.phone = ctrl.orderInfo.phone;
		item.orderDate = $filter('date')(orderDate, "EEE, M/dd");
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