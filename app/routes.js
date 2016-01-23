var mongoose = require('mongoose');
var Albums = require('./models/album');
var Photos = require('./models/photo');
var upload = require('./utils/upload');

module.exports = function(app) {

    app.post('/api/albums', [ upload.any(), function(req, res, next) {
        album = JSON.parse(req.body.album);
        Albums.create({
            name : album.name,
            description : album.description,
            path : "resources/" + album.name + "/"
        }, function(err, album) {
             if (err)
                 res.send(err);
             res.status(204).end();
        });
    }]);

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

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); 
    });
};

