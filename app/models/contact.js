'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    email: { type: String, required: true },
    address : {type: String, required: true, unique:true},
    city : {type: String, required: true, unique:true},
    phoneNumber: {type: String, required:true, unique: true},
    appDescription: {type: String, required:true,unique:true},
    facebookPage: {type: String, required:true,unique:true}
});

var Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;