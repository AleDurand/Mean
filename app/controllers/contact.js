'use strict';

var errorHandler = require('../errors/errorHandler');
var nodemailer = require('nodemailer');

var template = {
    from: 'Marcela Sánchez Fotografía {{address}}',
    to: 'mrnrodecker@gmail.com',
    subject: 'Contacta a {{name}} su email es: {{address}}',
    text: '{{message}} {{name}}',
    html: '{{message}} <br><br> <b>{{name}}</b>'
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