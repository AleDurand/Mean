'use strict';

var albums = require('./controllers/albums');
var users = require('./controllers/users');
var contact = require('./controllers/contact');
var auth = require('./controllers/middlewares/auth');

module.exports = function (app) {
    // Album enpoints
    app.route('/api/albums').post(auth.isAuthenticated, albums.create);
    app.route('/api/albums').get(albums.all);
    app.route('/api/albums/:album_id').get(albums.getById);
    app.route('/api/albums/:album_id').delete(auth.isAuthenticated, albums.delete);
    app.route('/api/albums/:album_id/photos').post(auth.isAuthenticated, albums.addPhotos);
    app.route('/api/albums/:album_id').put(auth.isAuthenticated, albums.update);
    app.route('/api/albums/:album_id/photos/:photo_id').delete(auth.isAuthenticated, albums.deletePhoto);
    
    // User enpoints
    app.route('/api/users').post(auth.isAuthenticated, users.create);
    app.route('/api/users/:user_id').get(auth.isAuthenticated, users.getById);
    app.route('/api/users/:user_id').put(auth.isAuthenticated, users.update);
    app.route('/api/users/:user_id').delete(auth.isAuthenticated, users.delete);
    app.route('/api/users').get(auth.isAuthenticated, users.all);
    app.route('/api/users/:user_id').get(auth.isAuthenticated, users.getByUsername);
    // Contact endpoints
    app.route('/api/contact/send-email').post(contact.sendEmail);

};
