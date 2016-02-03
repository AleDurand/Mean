'use strict';

var errorHandler = require('../errors/errorHandler');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://contact.designer.bb%40gmail.com:Password1%40@smtp.gmail.com');

var mailOptions = {
    from: 'Fred Foo 👥 <contact.designer.bb@gmail.com>', 
    to: 'valid_email@gmail.com',
    subject: 'Hello ✔', 
    text: 'Hello world 🐴',
    html: '<b>Hello world 🐴</b>' 
};

exports.sendEmail = function (req, res) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        }
        return res.status(204).end()
    });
};