'use strict';

var mongoose = require('mongoose');
var PhotoSchema = require('./photo');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    name: {
        type: String,
        unique: 'Album already exists',
        required: 'Please fill in a name'
    },
    description: {
        type: String,
        required: 'Please fill in a description'
    },
    path: {
        type: String,
        unique: 'Path already exists',
        required: 'Please fill in a path'
    },
    albumImage: {
        type: Schema.Types.ObjectId, ref: 'Photo'
    },
    photos: [{
        unique: false,
        type: Schema.Types.ObjectId, ref: 'Photo'
    }]
});

AlbumSchema.post('remove', function (album) {
    for (var i = 0; i < album.photos.length; i++) {
        PhotoSchema.remove({ _id: album.photos[i] }).exec();
    }
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
