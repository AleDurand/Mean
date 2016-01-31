'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill in a name'
    },
    path: {
        type: String,
        unique: 'Path already exists',
        required: 'Please fill in a path'
    }
});

var Photo = mongoose.model('Photo', PhotoSchema);


module.exports = Photo;
