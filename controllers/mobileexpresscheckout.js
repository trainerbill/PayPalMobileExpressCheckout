'use strict';





module.exports = function (app) {




    app.get('/mobileexpresscheckout/:call?', function (req, res) {
        console.log(req.params);
        if (req.params.call !== undefined) {
            if (req.params.call === 'getexpresscheckout') {

                var rvar = {};
                rvar.TOKEN = req.query.token;

                res.render('confirm', rvar);

            } else if (req.params.call === 'doexpresscheckout') {
                res.render('receipt', rvar);
            }
        } else {
            res.render('mobileexpresscheckout');
        }



    });

};