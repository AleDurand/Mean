var multer  = require('multer');
var fs = require('fs');    

var upload = function (opts) {
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './public/' + opts.destination);
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		}
	});
	return multer({ storage: storage })
};

module.exports = upload;