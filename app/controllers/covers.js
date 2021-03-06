'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var Covers = require('../models/cover');
var upload = require('../utils/upload_cover');
var errorHandler = require('../errors/errorHandler');
var config = require('../../config/config');

Covers.create({
    path: config.path_covers + "slide1.jpg",
    description1: "Podes entrar en la sección",
    description2: "cumpleaños de 15",
    description3: "y encargar tus fotos"
    })
    .then(function (cover) {
        console.log("Cover created")
    })
    .catch(function (error) {
        console.log("Cover already exists")
    })

Covers.create({
    path: config.path_covers + "slide2.jpg",
    description1: "Detené el tiempo",
    description2: "en los momentos únicos e irrepetibles",
    description3: "donde primen las emociones"
    })
    .then(function (cover) {
        console.log("Cover created")
    })
    .catch(function (error) {
        console.log("Cover already exists")
    })

Covers.create({
    path: config.path_covers + "slide3.jpg",
    description1: "Tus momentos registrados en fotos",
    description2: "serán resguardados",
    description3: "para siempre"
    })
    .then(function (cover) {
        console.log("Cover created")
    })
    .catch(function (error) {
        console.log("Cover already exists")
    })    

exports.create = function(req, res) {
    Covers.create({
        description1 : req.body.description1,
        description2 : req.body.description2,
        description3 : req.body.description3,
        path : req.body.path
    })
    .then(function(cover){
        return res.status(201).send(cover);
    })
    .catch(function(error) {
        res.status(400).send({ message: 'Error occurred while creating the cover.' });
    });
};

exports.all = function(req, res) {
    Covers.find()
    .then(function(covers) {
        return res.json(covers);
    })
    .catch(function(error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
    });
};

exports.getById = function(req, res) {
    Covers.findOne({ _id : req.params._id })
    .then(function(covers) {
        if (!cover) return res.status(404).send({ message: "Cover not found." })
        return res.json(cover);
    })
    .catch(function(error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
    });
};

exports.update = function(req, res) {
    var upload_p = upload.any();
    upload_p(req, res, function(uploadError) {
        if(uploadError){
            return res.status(400).send({
                message: 'Error occurred while uploading the photo'
            });
        }
        var _cover = JSON.parse(req.body.cover);
        Covers.findOne({ _id : req.params._id })
        .then(function(cover){
            if (!cover) return res.status(404).send({ message: "Cover not found." })
            return cover.update({$set:{description1: _cover.description1, description2: _cover.description2, description3: _cover.description3}})
        })
        .then(function (cover) {
            return res.status(204).end();
        })
        .catch(function(error) {
            return res.status(400).send(error);
        });
    });
}