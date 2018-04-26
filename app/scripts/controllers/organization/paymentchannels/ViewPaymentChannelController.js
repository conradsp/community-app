(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewPaymentChannelController: function (scope, routeParams, resourceFactory, location, $uibModal, route) {
            scope.paymentChannels = [];
            scope.formData = [];
            resourceFactory.paymentChannelsResource.getAll( function (data) {
                scope.paymentChannels = data;
            });

            scope.showEdit = function(id){
                location.path('/editpaymentchannel/' + id);
            }

           var PaymentChannelDeleteCtrl = function ($scope, $uibModalInstance,channelId) {
               $scope.delete = function () {
                   resourceFactory.paymentChannelsResource.delete({channelId: channelId}, {}, function (data) {
                       $uibModalInstance.close('delete');
                       route.reload();
                   });
               };
               $scope.cancel = function () {
                   $uibModalInstance.dismiss('cancel');
               };
           }
                scope.deletePaymentChannel = function (id) {
                    $uibModal.open({
                        templateUrl: 'deletePaymentChannel.html',
                        controller: PaymentChannelDeleteCtrl,
                        resolve: {
                            channelId: function () {
                                return id;
                            }
                        }
                    });
                };

                }
    });
    mifosX.ng.application.controller('ViewPaymentChannelController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$uibModal', '$route', mifosX.controllers.ViewPaymentChannelController]).run(function ($log) {
        $log.info("ViewPaymentChannelController initialized");
    });
}(mifosX.controllers || {}));
