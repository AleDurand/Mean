'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var Covers = require('../models/cover');
var upload = require('../utils/upload');
var errorHandler = require('../errors/errorHandler');
var basepath = 'resources/covers/';

exports.create = function(req, res) {
    Covers.create({
        name: req.body.name
        description1 : req.body.description1,
        description2 : req.body.description2,
        description3 : req.body.description3,
        path : basepath + req.body.name
    })
    .then(function(cover){
        fs.mkdirSync('./public/' + basepath + req.body.name);
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
        return cover.update({$set:{name : req.body.name, description1: req.body.description1, description2: req.body.description2, description3: req.body.description3, path : basepath + req.body.name}})
    })
    .then(function (cover) {
        return res.status(204).end();
    })
    .catch(function(error) {
        return res.status(400).send({ message: errorHandler.getErrorMessage(error)});
    