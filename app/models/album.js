var mongoose = require('mongoose');

module.exports = mongoose.model('Album', {
    name : String,
    description : String,
    path: String
});