var multer = require('multer');
var fs = require('fs');
var path = require('path');
var config = require('../../config/config');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.path_media + config.path_covers);
    },
    filename: function (req, file, cb) {
    	var cover = JSON.parse(req.body.cover);
    	var filename = path.basename(cover.path);
        cb(null, filename);
    }

});

var upload = multer({ storage: storage });

module.exports = upload;