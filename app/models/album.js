'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    name : {
    	type: String,
    	unique: 'Album already exists',
    	required: 'Please fill in a name'
    },
    description : {
    	type: String,
    	required: 'Please fill in a description'
    },
    path: {
    	type: String,
    	unique: 'Path already exists',
    	required: 'Please fill in a path'
    },
    photos: {
    	type: [{
    		type: String,
    		unique: 'Photo name already exists'
    	}],
    	default: []
    }
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
