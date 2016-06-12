'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var Covers = require('../models/cover');
var upload = require('../utils/upload');
var errorHandler = require('../errors/errorHandler');
var basepath = 'resources/covers/';

Covers.create({
    path: "resources/covers/slide1.jpg",
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
    path: "resources/covers/slide2.jpg",
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
    path: "resources/covers/slide3.jpg",
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
    Covers.findOne({ _id : req.params._id})
    .then(function(cover){
        if (!cover) return res.status(404).send({ message: "Cover not found." })
        return cover.update({$set:{description1: req.body.description1, description2: req.body.description2, description3: req.body.description3, path : req.body.path}})
    })
    .then(function (cover) {
        return res.status(204).end();
    })
    .catch(function(error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error)});
    });
}