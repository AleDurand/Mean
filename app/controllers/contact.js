'use strict';

var errorHandler = require('../errors/errorHandler');
var nodemailer = require('nodemailer');
var Contact = require('../models/contact');
var contact = null;
Contact.create({
    email: "mrnrodecker@gmail.com",
    address: "Colón 270",
    phoneNumber: "(2954)690150",
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
    from: 'Marcela Sanchez Fotografías {{address}}',
    to: '{{emailTo}}',
    subject: 'Contacta a {{name}}, su email es: {{address}}, número de teléfono: {{telefono}}',
    text: '{{message}} {{name}}',
    html: '<b>Email enviado por: {{name}}</b> <br> <br> {{message}} <br><br> Álbum:{{album}} <br> Imágenes para imprimir (se muestra el nombre): {{photos}} </br>'
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
                                  facebookPage: req.body.facebookPage}
                           })
            })
        .then(function (contact) {
            return res.status(204).end();
        })
        .catch(function (error) {
            return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        });
};