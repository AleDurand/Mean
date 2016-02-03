'use strict';

var errorHandler = require('../errors/errorHandler');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://contact.designer.bb%40gmail.com:Password1%40@smtp.googlemail.com');
var send = transporter.templateSender(template);

var template = {
    from: 'Administrator <contact.designer.bb@gmail.com>',
    to: 'alejandro.durand.90@gmail.com',
    subject: 'Contact {{address}}',
    text: '{{message}} \n\n {{name}}\n{{phone}}',
    html: '{{message}} \n\n {{name}}\n{{phone}}'
};

exports.sendEmail = function (req, res) {
    send(template, req.body, function (error, info) {
        if (error) {
            return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        }
        return res.status(204).end()
    });
};