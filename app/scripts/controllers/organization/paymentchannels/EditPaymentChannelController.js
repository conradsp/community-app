(function (module) {
    mifosX.controllers = _.extend(module, {
        EditPaymentChannelController: function (scope, routeParams, resourceFactory, location, $uibModal, dateFilter, route) {

            scope.paymentTypes = [];

            resourceFactory.paymentTypeResource.getAll({}, function (data) {
                scope.paymentTypes = data;
            });

            resourceFactory.paymentChannelsResource.get({channelId: routeParams.channelId}, function (data) {
                scope.formData = {
                    channelName: data.channelName,
                    channelBrokerEndpoint: data.channelBrokerEndpoint,
                    paymentTypeId: data.paymentTypeId,
                    requestQueue: data.requestQueue,
                    responseQueue : data.responseQueue,
                    channelType: 1,
                    isActive: 1,
                    dateCreated: data.dateCreated,
                    lastModified: dateFilter(Date.now(), scope.df),
                    phoneNumberDefaultRegion: data.phoneNumberDefaultRegion,
                    userId: data.userId
                };
            });

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                resourceFactory.paymentChannelsResource.update({channelId: routeParams.channelId},this.formData, function (data) {
                    location.path('/paymentchannels/');
                });
            };

        }
    });
    mifosX.ng.application.controller('EditPaymentChannelController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$uibModal', 'dateFilter', '$route', mifosX.controllers.EditPaymentChannelController]).run(function ($log) {
        $log.info("EditPaymentChannelController initialized");
    });
}(mifosX.controllers || {}));
