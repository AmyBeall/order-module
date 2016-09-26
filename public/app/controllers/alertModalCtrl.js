
// -------------------------------------------------- //
// -------------------------------------------------- //
// I control the Alert modal window.
// --
// NOTE: This controller gets "modals" injected; but, it is in no way
// different than any other Controller in your entire AngularJS application.
// It takes services, manages the view-model, and knows NOTHING about the DOM.
angular.module('AlertModalCtrl', [])
.controller(
    "AlertModalController",
    function( $scope, modals ) {
        // Setup default values using modal params.
        $scope.company = ( modals.params().company || "Not Found!" );
        $scope.headCount = ( modals.params().headCount || "Not Found!" );
        $scope.time = ( modals.params().time || "Not Found!" );
        $scope.items = ( modals.params().items || "Not Found!" );

        // ---
        // PUBLIC METHODS.
        // ---
        // Wire the modal buttons into modal resolution actions.
        $scope.close = modals.resolve;
        // I jump from the current alert-modal to the confirm-modal.
        $scope.jumpToConfirm = function() {
            // We could have used the .open() method to jump from one modal
            // to the next; however, that would have implicitly "rejected" the
            // current modal. By using .proceedTo(), we open the next window, but
            // defer the resolution of the current modal until the subsequent
            // modal is resolved or rejected.
            modals.proceedTo(
                "confirm",
                {
                    message: "Are you sure?",
                    confirmButton: "Yes!",
                    denyButton: "The order is not completed"
                }
            )
            .then(
                function handleResolve() {
                    console.log( "Piped confirm resolved." );
                },
                function handleReject() {
                    console.warn( "Piped confirm rejected." );
                }
            );
        };
    }
);