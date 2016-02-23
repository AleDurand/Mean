'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Albums = require('../models/album');
var Photos = require('../models/photo');
var upload = require('../utils/upload');
var errorHandler = require('../errors/errorHandler');
var basepath = 'resources/albums/';

exports.create = function(req, res) {
    Albums.create({
        name : req.body.name,
        description : req.body.description,
        path : basepath + req.body.name + "/"
    })
    .then(function(album){
        fs.mkdirSync('./public/' + basepath + req.body.name);
        return res.status(201).end();
    })
    .catch(function(error) {
        res.status(400).send({ message: 'Error occurred while creating the album.' });
    });
};

exports.all = function(req, res) {
    Albums.find().populate("photos").populate("albumImage")
    .then(function(albums) {
        return res.json(albums);
    })
    .catch(function(error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
    });
};

exports.getById = function(req, res) {
    Albums.findOne({ _id : req.params.album_id }).populate("photos")
    .then(function(album) {
        if (!album) return res.status(404).send({ message: "Album not found." })
        return res.json(album);
    })
    .catch(function(error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
    });
};

exports.update = function(req, res) {
    Albums.findOne({ _id : req.params.album_id })
    .then(function(album){
        if (!album) return res.status(404).send({ message: "Album not found." })
        return album.update({ albumImage: req.body.albumImage })
    })
    .then(function (album) {
        return res.status(204).end();
    })
    .catch(function(error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error)});
    });
};

exports.delete = function(req, res) {
    Albums.findOne({ _id : req.params.album_id })
    .then(function(album){
        if (!album) return res.status(404).send({ message: "Album not found." })
        album.remove();
        return album;
    })
    .then(function(album){
        rmdir('./public/' + album.path);
        return res.status(204).end();
    })
    .catch(function(error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
    });
};

exports.addPhotos = function(req, res) {
    var upload_p = upload.any();

    upload_p(req, res, function(uploadError) {
        if(uploadError){
            return res.status(400).send({
                message: 'Error occurred while uploading the photos'
            });
        }
        var album = JSON.parse(req.body.album);
        for(var i = 0; i < req.files.length; i++){
            Photos.create({
                name: req.files[i].originalname,
                path: album.path + req.files[i].originalname
            }, function(err, photo){
                if(!err){
                    Albums.update(
                       { _id: req.params.album_id },
                       { $addToSet: { photos: photo } 
                   }, function(error, album) {
                        if (error){
                            return res.status(404).send({
                                message: errorHandler.getErrorMessage(error)
                            });
                        }
                    });
                }
            });                
        }
        res.status(204).end();
    });
};

var rmdir = function(dir) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
        var filename = dir + list[i];
        console.log(filename);
        var stat = fs.statSync(filename);

        if(filename == "." || filename == "..") {
            // pass these files
        } else if(stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};

