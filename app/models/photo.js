var mongoose = require('mongoose');

module.exports = mongoose.model('Photo', {
    name : String,
    description : String,
    path: String
});