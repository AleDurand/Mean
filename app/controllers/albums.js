'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var Albums = require('../models/album');
var Photos = require('../models/photo');
var upload = require('../utils/upload');
var errorHandler = require('../errors/errorHandler')
var basepath = 'resources/albums/';

exports.create = function(req, res) {
    Albums.create({
        name : req.body.name,
        description : req.body.description,
        path : basepath + req.body.name + "/"
    }, function (error, albumn) {
        if (error){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(error)
            });  
        } 
        try{
            fs.mkdirSync('./public/' + basepath + req.body.name);
            return res.status(201).end();
        } catch (error) {
            return res.status(400).send({
                message: 'Error occurred while creating the album.'
            });
        } 
    }); 
};

exports.all = function(req, res) {
    Albums.find(function(error, albums) {
        if (error)
            return res.status(400).send({
                message: errorHandler.getErrorMessage(error)
            });
        return res.json(albums);
    });
};

exports.getById = function(req, res) {
    Albums.findOne({
        _id : req.params.album_id
    }, function(error, album) {
        if (error)
            return res.status(404).send({
                message: errorHandler.getErrorMessage(error)
            });
        album.populate("photos", function(error, album) {
            return res.json(album)
        });
    });
};

exports.delete = function(req, res) {
    Albums.findOne({
        _id : req.params.album_id
    }, function(error, album) {
        if (error){
           return res.status(404).send({
                message: errorHandler.getErrorMessage(error)
            }); 
        } 
        album.remove();
        try{
            rmdir('./public/'+ album.path);
            return res.status(204).end();
        } catch (error) {
            return res.status(400).send({
                message: 'Error occurred while removing the album.'
            });
        }          
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
    });
};

exports.update = function(req, res) {
    Albums.update(
        {_id: req.params.album_id},
        {albumImage: req.body.imageAlbum}
   , function(error, album) {
        console.log("ERROR\n"+error);
        console.log("ALBUM\n"+req.params.album_id);
        if (error){
            return res.status(404).send({
                message: errorHandler.getErrorMessage(error)
            });
        }
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

