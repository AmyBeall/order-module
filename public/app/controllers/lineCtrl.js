angular.module('lineCtrl', [])
.controller('LineController', function( $scope, modals, orderFactory ) {
	var ctrl = this;
	
	ctrl.orders = [];

	ctrl.OrderInfo = {};
	ctrl.OrderInfo.hello = 'Amy!';

	orderFactory.all().success(function(data){
		ctrl.orders = data;
		for(order in ctrl.orders){
			items = ctrl.orders[order].item;
			// for(item in items){
			// 	console.log(items[item]);
			// }
		}
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
