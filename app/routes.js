var Albums = require('./models/album');
var upload = require('./utils/upload');

module.exports = function(app) {

    app.get('/api/albums', function(req, res) {
        Albums.find(function(err, albums) {
            if (err)
                res.send(err)
            res.json(albums);
        });
    });

    app.post('/api/albums', [ upload.any(), function(req, res, next) {
        Albums.create({
            name : req.body.name,
            description : req.body.name,
            path : req.body.path
        }, function(err, album) {
            if (err)
                res.send(err);
        });
        
    }]);

    app.delete('/api/albums/:album_id', function(req, res) {
        Albums.remove({
            _id : req.params.album_id
        }, function(err, album) {
            if (err)
                res.send(err);
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); 
    });

};
