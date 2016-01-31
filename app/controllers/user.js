'use strict'

// Load required packages
var mongoose = require('mongoose');
var User = require('../models/user');

var hardCodedUser = new User({
    name: "Marcela",
    lastname: "Sánchez",
    username: "MarcelaSanchez",
    password: "MarcelaSanchezAlpachiri",
    email: "mrnrodecker@gmail.com"
});

//hardCodedUser.save(); 

// Create endpoint /api/users for POST
exports.postUsers = function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'New beer drinker added to the locker room!' });
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};
