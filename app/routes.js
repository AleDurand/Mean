'use strict';

module.exports = function (app) {
    // Album routes
    var albums = require('./controllers/albums');

    // Albums API
    app.route('/api/albums').post(albums.create);
    app.route('/api/albums').get(albums.all);
    app.route('/api/albums/:album_id').get(albums.getById);
    app.route('/api/albums/:album_id').delete(albums.delete);
    app.route('/api/albums/:album_id/photos').post(albums.addPhotos);
    app.route('/api/albums/:album_id').put(albums.update);
};
