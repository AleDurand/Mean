'use strict';

var albums = require('./controllers/albums');
var users = require('./controllers/users');
var contact = require('./controllers/contact');
var covers = require('./controllers/covers');
var auth = require('./controllers/middlewares/auth');
var cors = require('./controllers/middlewares/cors');

module.exports = function (app) {
    // Album enpoints
    app.route('/api/albums').post(auth.isAuthenticated, cors.cors, albums.create);
    app.route('/api/albums').get(cors.cors, albums.all);
    app.route('/api/albums/:name').get(cors.cors, albums.getById);
    app.route('/api/albums/:name').delete(auth.isAuthenticated, cors.cors, albums.delete);
    app.route('/api/albums/:name/photos').post(auth.isAuthenticated, cors.cors, albums.addPhotos);
    app.route('/api/albums/:name').put(auth.isAuthenticated, cors.cors, albums.update);
    app.route('/api/albums/:name/photos/:photo_id').delete(auth.isAuthenticated, cors.cors, albums.deletePhoto);
    
    // Cover enpoints
    app.route('/api/covers').post(auth.isAuthenticated, cors.cors, covers.create);
    app.route('/api/covers').get(cors.cors, covers.all);
    app.route('/api/covers/:_id').get(cors.cors, covers.getById);
    app.route('/api/covers/:_id').put(auth.isAuthenticated, cors.cors, covers.update);

    // User enpoints
    app.route('/api/users').post(auth.isAuthenticated, cors.cors, users.create);
    app.route('/api/users/:username').get(auth.isAuthenticated, cors.cors, users.getByUsername);
    app.route('/api/users/:user_id').get(auth.isAuthenticated, cors.cors, users.getById);
    app.route('/api/users').put(auth.isAuthenticated, cors.cors, users.update);
    app.route('/api/users/:user_id').delete(auth.isAuthenticated, cors.cors, users.delete);
    app.route('/api/users').get(auth.isAuthenticated, cors.cors, users.all);
    
    // Contact endpoints
    app.route('/api/contact/send-email').post(cors.cors, contact.sendEmail);
    app.route('/api/contact').get(cors.cors, contact.get);
    app.route('/api/contact').put(auth.isAuthenticated, cors.cors, contact.update)

};
