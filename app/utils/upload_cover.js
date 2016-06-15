var multer = require('multer');
var fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/resources/covers');
    },
    filename: function (req, file, cb) {
    	var cover = JSON.parse(req.body.cover);
    	var filename = path.parse(cover.path).base;
        cb(null, filename);
    }

});

var upload = multer({ storage: storage });

module.exports = upload;