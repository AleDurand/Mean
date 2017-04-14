'use strict';

var mongoose = require('mongoose');
var PhotoSchema = require('./photo');
var Schema = mongoose.Schema;

var CoverSchema = new Schema({
    description1: {
        type: String,
        required: 'Please fill in a description'
    },
    description2: {
        type: String,
        required: 'Please fill in a description'
    },
    description3: {
        type: String,
        required: 'Please fill in a description'
    },
    path: {
        type: String,
        unique: 'Path already exists',
        required: 'Please fill in a path'
    }
});

var Cover = mongoose.model('Cover', CoverSchema);

module.exports = Cover;
