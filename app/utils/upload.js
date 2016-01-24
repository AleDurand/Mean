var multer  = require('multer');
var fs = require('fs');    

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		album = JSON.parse(req.body.album);
		cb(null, './public/' + album.path);
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
	fileFilter: function(req, file, cb) {
		if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg'){
			return cb(new Error('Only image files are allowed!'), false);
		}
		cb(null, true);
	}
});

var upload = multer({ storage: storage });

module.exports = upload;