var multer  = require('multer');
var fs = require('fs');    
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/resources')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})
var upload = multer({ storage: storage })

module.exports = upload;