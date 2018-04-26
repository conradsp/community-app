(function (module) {
    mifosX.controllers = _.extend(module, {
        CreatePaymentChannelController: function (scope, routeParams, resourceFactory, location, $uibModal, dateFilter, route) {

            scope.formData = {
                channelType: 1,
                isActive: 1,
                dateCreated: dateFilter(Date.now(), scope.df),
                lastModified: dateFilter(Date.now(), scope.df),
                phoneNumberDefaultRegion: "KE",
                userId: scope.userId
            };
            scope.paymentTypes = [];

            resourceFactory.paymentTypeResource.getAll({}, function (data) {
                scope.paymentTypes = data;
            });

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                resourceFactory.paymentChannelsResource.save(this.formData, function (data) {
                    location.path('/paymentchannels/');
                });
            };

        }
    });
    mifosX.ng.application.controller('CreatePaymentChannelController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$uibModal', 'dateFilter', '$route', mifosX.controllers.CreatePaymentChannelController]).run(function ($log) {
        $log.info("CreatePaymentChannelController initialized");
    });
}(mifosX.controllers || {}));
