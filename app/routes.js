var mongoose = require('mongoose');
var fs = require('fs');
var Albums = require('./models/album');
var upload = require('./utils/upload');

var basepath = 'resources/albums/';

module.exports = function(app) {

    app.post('/api/albums', function(req, res) {
        try {
            fs.mkdirSync('./public/' + basepath + req.body.name);
            Albums.create({
                name : req.body.name,
                description : req.body.description,
                path : basepath + req.body.name + "/",
                photos: []
            }, function(err, album) {
                if (err)
                    res.send(err);
                res.status(201).end();
            });
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }   
    });

    app.get('/api/albums', function(req, res) {
        Albums.find(function(err, albums) {
            if (err)
                res.send(err);
            res.json(albums);
        });
    });

    app.get('/api/albums/:album_id', function(req, res) {
        Albums.findOne({
            _id : mongoose.Types.ObjectId(req.params.album_id)
        }, function(err, album) {
            if (err)
                res.send(err);
            res.json(album);
        });
    });

    app.delete('/api/albums/:album_id', function(req, res) {
        Albums.remove({
            _id : mongoose.Types.ObjectId(req.params.album_id)
        }, function(err, album) {
            if (err)
                res.send(err);
        });
    });

    app.post('/api/albums/:album_id/photos', [ upload({destination: basepath + "a"}).any(), function(req, res, next) {
        album = JSON.parse(req.body.album);
        for(var i = 0; i < req.files.length; i++){
            console.log(req.files[i].originalname);
            newPath = album.path + req.files[i].originalname;
            Albums.update(
               { _id: mongoose.Types.ObjectId(req.params.album_id) },
               { $addToSet: { photos: newPath } 
           }, function(err, album) {
                if (err)
                    res.send(err);
            });
        }
        res.status(201).end();
    }]);

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); 
    });
};

