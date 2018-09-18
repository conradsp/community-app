(function (module) {
    mifosX.controllers = _.extend(module, {
        PaymentGatewayController: function (scope, routeParams, resourceFactory, location, $uibModal, route) {
            scope.formData = {};
            scope.allPaymentTypes = [];
            scope.allUsers = [];

            resourceFactory.paymentTypeResource.getAll({}, function (data) {
                scope.allPaymentTypes = data;
            });

            resourceFactory.userResource.getAllUsers({}, function (data) {
                scope.allUsers = data;
            });

            resourceFactory.paymentGatewayResource.get({}, function (data) {
                scope.formData = {
                    isActive: data.isActive,
                    gatewayUrl: data.gatewayUrl,
                    paymentType: data.paymentTypeId,
                    userId : data.paymentGatewayUser
                };
            });

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                resourceFactory.paymentGatewayResource.update({},this.formData, function (data) {
                    location.path('/paymentgateway/');
                });
            };
        }
    });
    mifosX.ng.application.controller('PaymentGatewayController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$uibModal', '$route', mifosX.controllers.PaymentGatewayController]).run(function ($log) {
        $log.info("PaymentGatewayController initialized");
    });
}(mifosX.controllers || {}));
