var multer = require('multer');
var fs = require('fs');
var media = require('../../config/media');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var album = JSON.parse(req.body.album);
        cb(null, media.path_media + album.path);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

module.exports = upload;