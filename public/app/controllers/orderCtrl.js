angular.module('orderCtrl', [])
.controller('orderController', function(configFactory, itemFactory, orderFactory, $scope, $sce, $filter, $location){

	var ctrl = this,
		order = {},
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

	ctrl.showCategories = true;
	ctrl.showOptions = false;
	ctrl.showIngredients = false;
	ctrl.showSubmit = false;
	ctrl.hideform = false;

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
	    })
		itemFactory.all().success(function(data){
			ctrl.menuItems = data;
		})
	}
	ctrl.init();

	var requests = [];
	// Change the name of sheet ID '0' (the default first sheet on every
	// spreadsheet)
	requests.push({
	  updateSheetProperties: {
	    properties: {sheetId: 0, title: 'New Sheet Name'},
	    fields: 'title'
	  }
	});
	// Insert the values 1, 2, 3 into the first row of the spreadsheet with a
	// different background color in each.
	requests.push({
	  updateCells: {
	    start: {sheetId: 0, rowIndex: 0, columnIndex: 0},
	    rows: [{
	      values: [{
	        userEnteredValue: {numberValue: 1},
	        userEnteredFormat: {backgroundColor: {red: 1}}
	      }, {
	        userEnteredValue: {numberValue: 2},
	        userEnteredFormat: {backgroundColor: {blue: 1}}
	      }, {
	        userEnteredValue: {numberValue: 3},
	        userEnteredFormat: {backgroundColor: {green: 1}}
	      }]
	    }],
	    fields: 'userEnteredValue,userEnteredFormat.backgroundColor'
	  }
	});
	// Write "=A1+1" into A2 and fill the formula across A2:C5 (so B2 is
	// "=B1+1", C2 is "=C1+1", A3 is "=A2+1", etc..)
	requests.push({
	  repeatCell: {
	    range: {
	      sheetId: 0,
	      startRowIndex: 1,
	      endRowIndex: 6,
	      startColumnIndex: 0,
	      endColumnIndex: 3
	    },
	    cell: {userEnteredValue: {formulaValue: '=A1 + 1'}},
	    fields: 'userEnteredValue'
	  }
	});
	
	requests.push({
	  copyPaste: {
	    source: {
	      sheetId: 0,
	      startRowIndex: 0,
	      endRowIndex: 1,
	      startColumnIndex: 0,
	      endColumnIndex: 3
	    },
	    destination: {
	      sheetId: 0,
	      startRowIndex: 1,
	      endRowIndex: 6,
	      startColumnIndex: 0,
	      endColumnIndex: 3
	    },
	    pasteType: 'PASTE_FORMAT'
	  }
	});
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
		ctrl.item.type = ctrl.category;
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
		order.item = [];
		order.vendor = ctrl.orderInfo.vendor;
		order.customer = ctrl.orderInfo.companyName;
		order.address = ctrl.orderInfo.companyAddress;
		order.pickUpDate = ctrl.orderInfo.date;
		order.pickUpTime = ctrl.orderInfo.time;
		order.orderNum = ctrl.orderInfo.orderNumber;
		for(item in ctrl.orderItems){
			order.item.push(ctrl.orderItems[item]);
		}
		order.entryDate = new Date();

		orderFactory.sheetCreate(requests)
			.success(function(data) {
        		console.log(data);
      		});	

		orderFactory.create(order)
			.success(function(data) {
        		console.log(data.message);
        		$location.path( "/order" );
      		});
	}

});