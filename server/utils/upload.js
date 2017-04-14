var multer = require('multer');
var fs = require('fs');
var config = require('../../config/config');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var album = JSON.parse(req.body.album);
        cb(null, config.path_media + album.path);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

module.exports = upload;