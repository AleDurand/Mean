'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var Albums = require('../models/album');
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
              
        else{
            try{
                fs.mkdirSync('./public/' + basepath + req.body.name);
                return res.status(201).end();
            } catch (error) {
                return res.status(400).send({
                    message: 'Error occurred while creating the album.'
                });
            } 
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
        return res.json(album);
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
        } else {
            album.remove();
            try{
                rmdir('./public/'+ album.path);
                return res.status(204).end();
            } catch (error) {
                return res.status(400).send({
                    message: 'Error occurred while removing the album.'
                });
            }         
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
        else{
            var album = JSON.parse(req.body.album);
            var newPath = "";
            for(var i = 0; i < req.files.length; i++){
                newPath = album.path + req.files[i].originalname;
                Albums.update(
                   { _id: req.params.album_id },
                   { $addToSet: { photos: newPath } 
               }, function(error, album) {
                    if (error)
                        return res.status(404).send({
                            message: errorHandler.getErrorMessage(error)
                        });
                });
            }
            return res.json(album);
        }
    });
};


var rmdir = function(dir) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
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

