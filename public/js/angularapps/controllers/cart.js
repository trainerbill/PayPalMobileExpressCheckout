/**
 * Created by athroener on 2/20/14.
 */
"use strict";
/*global application */
application.factory('PayPalResource', function ($resource) {

    return $resource('/paypal/:experience/:call', {}, {
        post: {method: 'post', params: {experience: '@id', call: '@id'}}


    });
})
    .controller('Cart', function ($scope, PayPalResource) {
        console.log('Rocking');


        $scope.setExpressCheckout = function (call) {
            console.log('rocking');
            PayPalResource.post({
                experience: 'expresscheckout',
                call: 'setexpresscheckout'
            },
            {
                _csrf: $scope.csrf,
                PAYMENTREQUEST_0_AMT: 10,
                PAYMENTREQUEST_0_PAYMENTACTION: 'Sale',
                PAYMENTREQUEST_0_CURRENCYCODE: 'USD',
                RETURNURL: window.location.protocol + '//' + window.location.host + '/mobileexpresscheckout/getexpresscheckout',
                CANCELURL: window.location.protocol + '//' + window.location.host + '/mobileexpresscheckout/getexpresscheckout',

                PAYMENTREQUEST_0_ITEMAMT: 10,
                L_PAYMENTREQUEST_0_NAME0: "Camera",
                L_PAYMENTREQUEST_0_DESC0: "Pretty Cool Camera",
                L_PAYMENTREQUEST_0_AMT0: 10,
                L_PAYMENTREQUEST_0_QTY0: 1,

                SOLUTIONTYPE: 'Sole'    //Needed for guest checkout

            }, function (res, err) {

                    window.location.href = 'https://www.sandbox.paypal.com/checkoutnow?token=' + res.response.decoded.TOKEN;


            });
        }

        $scope.getExpressCheckout = function () {
            console.log('getec');
            PayPalResource.post({
                    experience: 'expresscheckout',
                    call: 'getexpresscheckout'
                },
                {
                    _csrf: $scope.csrf,
                    TOKEN: $scope.TOKEN

                }, function (res, err) {

                        $scope.getec = res.response.decoded
                        console.log($scope.getec);


                });
        }

        $scope.doExpressCheckout = function () {

            PayPalResource.post({
                    experience: 'expresscheckout',
                    call: 'doexpresscheckout'
                },
                {
                    _csrf: $scope.csrf,
                    TOKEN: $scope.getec.TOKEN,
                    PAYERID: $scope.getec.PAYERID,
                    PAYMENTREQUEST_0_AMT: $scope.getec.PAYMENTREQUEST_0_AMT

                }, function (res, err) {

                    $scope.doec = res.response.decoded
                    console.log($scope.doec);


                });
        }
    });