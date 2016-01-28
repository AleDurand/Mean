'use strict';

module.exports = function (app) {
    // Album routes
    var albums = require('./controllers/albums');
    var photos = require('./controllers/photos');
    var user = require('./controllers/user');
    var auth = require('./controllers/middlewares/auth');
    // Albums API
    app.route('/api/albums').post(auth.isAuthenticated,albums.create);
    app.route('/api/albums').get(auth.isAuthenticated,albums.all);
    app.route('/api/albums/:album_id').get(auth.isAuthenticated,albums.getById);
    app.route('/api/albums/:album_id').delete(auth.isAuthenticated,albums.delete);
    app.route('/api/albums/:album_id/photos').post(auth.isAuthenticated,albums.addPhotos);
    app.route('/api/albums/:album_id').put(auth.isAuthenticated,albums.update);
    //Users
    app.route('/api/users').post(user.postUsers);
    app.route('/api/users').get(auth.isAuthenticated, user.getUsers);
};
