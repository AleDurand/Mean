'use strict'

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Users = require('../models/user');
var errorHandler = require('../errors/errorHandler')

var hardCodedUser = new Users({
    name: "Marcela",
    lastname: "Sánchez",
    username: "123",
    password: "123",
    email: "mrnrodecker@gmail.com"
});

hardCodedUser.update({ upsert: true });

exports.create = function (req, res) {
    Users.create({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
        .then(function (user) {
            return res.json(user);
        })
        .catch(function (error) {
            res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        })
};

exports.getById = function (req, res) {
    Users.findOne({ _id: req.params.user_id })
        .then(function (user) {
            if (!user) return res.status(404).send({ message: "User not found." })
            return res.json(user);
        })
        .catch(function (error) {
            return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        });
};

exports.update = function (req, res) {
    Users.findOne({ _id: req.params.user_id })
        .then(function (user) {
            if (!user) return res.status(404).send({ message: "User not found." })
            Users.update({ _id: req.params.user_id },
                {
                    name: req.body.name,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                })
        })
        .then(function () {
            return res.status(204).end();
        })
        .catch(function (error) {
            return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        });
};

exports.delete = function (req, res) {
    Users.findOne({ _id: req.params.user_id })
        .then(function (user) {
            if (!user) return res.status(404).send({ message: "User not found." })
            user.remove();
            return res.status(204).end();
        })
        .catch(function (error) {
            return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        });
};

exports.all = function (req, res) {
    Users.find()
        .then(function (users) {
            return res.json(users);
        })
        .catch(function (error) {
            res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        })
};

exports.getByUsername = function (req, res) {
    Users.findOne({ _id: req.params.username })
        .then(function (user) {
            if (!user) return res.status(404).send({ message: "User not found." })
            return res.json(user);
        })
        .catch(function (error) {
            return res.status(400).send({ message: errorHandler.getErrorMessage(error) });
        });
};
