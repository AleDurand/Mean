'use strict';

var errorHandler = require('../errors/errorHandler');

exports.sendEmail = function (req, res) {
    try {
        return res.status(204).end();
    }
    catch (error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
    }

};