'use strict';


var paypal_classic_sdk = require('paypal-classic-sdk');
var querystring = require('querystring');

module.exports = function (app) {

    app.post('/paypal/:experience/:call', function (req, res) {

        try {
            var trx = paypal_classic_sdk.getModel(req.params.call);
            delete req.body._csrf;
            trx.exchangeData(req.body);
            trx.validateData();
            console.log(trx);
            paypal_classic_sdk.execute(trx.getParameters(), function (err, data) {

                var response;

                if (err) {
                    if (err.code != 'ECONNRESET') {

                        //Build return object
                        response = {
                            submit: data.submit,
                            response: data.response,
                            error: err.message
                        };
                    }
                    else {
                        response = {
                            response: { code: "ECONNRESET", message: "Timeout connecting to server.  Try again later"},
                            error: err.message
                        }
                    }
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(response));
                    res.end();
                }
                else {



                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    //Build return object
                    var response = {
                        submit: data.submit,
                        response: data.response
                    };

                    res.write(JSON.stringify(response));
                    res.end();
                }
            });
        }
        catch (err) {
            var response = {
                submit: err.submit,
                error: err.message
            };
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(response));
            res.end();
        }
    });
}