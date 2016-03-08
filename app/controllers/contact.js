'use strict';

var errorHandler = require('../errors/errorHandler');
var nodemailer = require('nodemailer');
var Contact = require('../models/contact');
var contact = null;
Contact.create({
    email: "mrnrodecker@gmail.com",
    address: "20 de Agosto N° 15",
    phoneNumber: "(2954)686401",
    city: "Alpachiri, La Pampa, Argentina",
    appDescription: "Espacio dedicado a mostrar las fotos tomadas en diferentes eventos.",
    facebookPage: "https://www.facebook.com/marcelasanchezdemosquera/"
    })
    .then(function (contact) {
        this.contact=contact;
        console.log("Contact created")
    })
    .catch(function (error) {
        console.log("Contact already exists")
    })

var template = {
    from: 'Marcela Sánchez Fotografía {{address}}',
    to: 'mrnrodecker@gmail.com',
    subject: 'Contacta a {{name}}, su email es: {{address}}',
    text: '{{message}} {{name}}',
    html: '<b>{{name}}</b> <br> <br> {{message}} <br><br> Imágenes para imprimir (por nombre): {{photos}} </br>'
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

exports.get = function(req, res){
    Contact.findOne()
    .then(function(contact) {
        if (!contact) return res.status(404).send({ message: "Contact not found." })
        return res.json(contact);
    })
    .catch(function(error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
    });  
};

exports.update = function (req, res) {
    Contact.findOne()
        .then(function (contact) {
            if (!contact) return res.status(404).send({ message: "Contact not found." })
            return contact.update({$set:{email: req.body.email, 
                                  address: req.body.address, 
                                  city: req.body.city, 
                                  phoneNumber: req.body.phoneNumber,
                                  appDescription: req.body.appDescription,
                                  facebookPahe: req.body.facebookPage}
                           })
            })
        .then(function (contact) {
            return res.status(204).end();
        })
        .catch(function (error) {
            return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        });
};