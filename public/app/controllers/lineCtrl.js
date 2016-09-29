angular.module('lineCtrl', [])
.controller('LineController', function( $scope, modals, orderFactory ) {
	var ctrl = this;
	
	ctrl.ordersTimeEarly = [];
	ctrl.ordersTime1 = [];
	ctrl.ordersTime2 = [];
	ctrl.ordersTime3 = [];
	ctrl.ordersTime4 = [];
	ctrl.ordersTime5 = [];
	ctrl.ordersTime6 = [];
	ctrl.ordersTime7 = [];
	ctrl.ordersTime8 = [];
	ctrl.ordersTime9 = [];
	ctrl.ordersTimeLate = [];

	orderFactory.all().success(function(data){
		for(datum in data){
			console.log(data[datum]);
			if(data[datum].setUpTime >= '1970-01-01T13:00:00.000Z' && data[datum].setUpTime < '1970-01-01T16:00:00.000Z'){
				ctrl.ordersTimeEarly.push(data[datum]);
			} else if(data[datum].setUpTime >= '1970-01-01T16:00:00.000Z' && data[datum].setUpTime < '1970-01-01T17:00:00.000Z'){
				ctrl.ordersTime1.push(data[datum]);	
			} else if(data[datum].setUpTime >= '1970-01-01T17:00:00.000Z' && data[datum].setUpTime < '1970-01-01T18:00:00.000Z'){
				ctrl.ordersTime2.push(data[datum]);
			} else if(data[datum].setUpTime >= '1970-01-01T18:00:00.000Z' && data[datum].setUpTime < '1970-01-01T19:00:00.000Z'){
				ctrl.ordersTime3.push(data[datum]);
			} else if(data[datum].setUpTime >= '1970-01-01T19:00:00.000Z' && data[datum].setUpTime < '1970-01-01T20:00:00.000Z'){
				ctrl.ordersTime4.push(data[datum]);	
			} else if(data[datum].setUpTime >= '1970-01-01T20:00:00.000Z' && data[datum].setUpTime < '1970-01-01T21:00:00.000Z'){
				ctrl.ordersTime5.push(data[datum]);
			} else if(data[datum].setUpTime >= '1970-01-01T21:00:00.000Z' && data[datum].setUpTime < '1970-01-01T22:00:00.000Z'){
				ctrl.ordersTime6.push(data[datum]);
			} else if(data[datum].setUpTime >= '1970-01-01T22:00:00.000Z' && data[datum].setUpTime < '1970-01-01T23:00:00.000Z'){
				ctrl.ordersTime7.push(data[datum]);	
			} else if(data[datum].setUpTime >= '1970-01-01T23:00:00.000Z' && data[datum].setUpTime < '1970-01-01T24:00:00.000Z'){
				ctrl.ordersTime8.push(data[datum]);	
			} else if(data[datum].setUpTime >= '1970-01-01T24:00:00.000Z' && data[datum].setUpTime < '1970-01-02T01:00:00.000Z'){
				ctrl.ordersTime9.push(data[datum]);	
			} else if(data[datum].setUpTime >= '1970-01-02T01:00:00.000Z' && data[datum].setUpTime < '1970-01-02T07:00:00.000Z'){
				ctrl.ordersTimeLate.push(data[datum]);				
			}

		}
		console.log(ctrl.ordersTimeEarly);
		console.log(ctrl.ordersTimeLate);
		// ctrl.ordersTime1 = data;
		// for(order in ctrl.ordersTime1){
		// 	items = ctrl.ordersTime1[order].item;
		// }
	})

    // I open an Alert-type modal
    ctrl.alertSomething = function(OrderInfo) {
        // The .open() method returns a promise that will be either
        // resolved or rejected when the modal window is closed.
        console.log(OrderInfo);
        var promise = modals.open(
            "alert",
            {
                company: OrderInfo.company,
                headCount: OrderInfo.headCount,
                time: OrderInfo.setUpTime,
                items: OrderInfo.item,
            }
        );
        promise.then(
            function handleResolve( response ) {
                console.log( "Alert resolved." );
            },
            function handleReject( error ) {
                console.warn( "Alert rejected!" );
            }
        );
    };
});
