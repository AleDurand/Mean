'use strict';

var albums = require('./controllers/albums');
var users = require('./controllers/users');
var contact = require('./controllers/contact');
var covers = require('./controllers/covers');
var auth = require('./controllers/middlewares/auth');
var cors = require('./controllers/middlewares/cors');

module.exports = function (app) {
    app.options('*', cors.cors, function(req, res, next) {
      return res.send(200);
    });

    // Album enpoints
    app.route('/api/albums').post(cors.cors, auth.isAuthenticated, albums.create);
    app.route('/api/albums').get(cors.cors, albums.all);
    app.route('/api/albums/:name').get(cors.cors, albums.getById);
    app.route('/api/albums/:name').delete(cors.cors, auth.isAuthenticated, albums.delete);
    app.route('/api/albums/:name/photos').post(cors.cors, auth.isAuthenticated, albums.addPhotos);
    app.route('/api/albums/:name').put(cors.cors, auth.isAuthenticated, albums.update);
    app.route('/api/albums/:name/photos/:photo_id').delete(cors.cors, auth.isAuthenticated, albums.deletePhoto);

    // Cover enpoints
    app.route('/api/covers').post(cors.cors, auth.isAuthenticated, covers.create);
    app.route('/api/covers').get(cors.cors, covers.all);
    app.route('/api/covers/:_id').get(cors.cors, covers.getById);
    app.route('/api/covers/:_id').put(cors.cors, auth.isAuthenticated, covers.update);

    // User enpoints
    app.route('/api/users').post(cors.cors, auth.isAuthenticated, users.create);
    app.route('/api/users/:username').get(cors.cors, auth.isAuthenticated, users.getByUsername);
    app.route('/api/users').put(cors.cors, auth.isAuthenticated, users.update);
    app.route('/api/users/:user_id').delete(cors.cors, auth.isAuthenticated, users.delete);
    app.route('/api/users').get(cors.cors, auth.isAuthenticated, users.all);

    // Contact endpoints
    app.route('/api/contact/send-email').post(cors.cors, contact.sendEmail);
    app.route('/api/contact').get(cors.cors, contact.get);
    app.route('/api/contact').put(cors.cors, auth.isAuthenticated, contact.update)

};
