'use strict';


var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();


    app.get('/mobileexpresscheckout', function (req, res) {

        res.render('mobileexpresscheckout', model);

    });

};