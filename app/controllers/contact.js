'use strict';

var errorHandler = require('../errors/errorHandler');
var nodemailer = require('nodemailer');

var template = {
    from: 'Administrator <contact.designer.bb@gmail.com>',
    to: 'mrnrodecker@gmail.com',
    subject: 'Contact {{address}}',
    text: '{{message}} {{name}} {{phone}}',
    html: '{{message}} <br><br> <b>{{name}}<br>{{phone}}</b>'
};

var transporter = nodemailer.createTransport('smtps://contact.designer.bb%40gmail.com:Password1%40@smtp.googlemail.com');
var send = transporter.templateSender(template);

exports.sendEmail = function (req, res) {
    send({}, req.body, function (error, info) {
        if (error) {
            return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        }
        return res.status(204).end()
    });
};