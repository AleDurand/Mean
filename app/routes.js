'use strict';

module.exports = function (app) {
    // Album routes
    var albums = require('./controllers/albums');

    // Albums API
    app.route('/api/albums').post(albums.create);
    app.route('/api/albums').get(albums.all);
    app.route('/api/albums/:name').get(albums.getById);
    app.route('/api/albums/:name').delete(albums.delete);
    app.route('/api/albums/:name/photos').post(albums.addPhotos);
};
