'use strict';

var albums = require('./controllers/albums');
var users = require('./controllers/users');
var contact = require('./controllers/contact');
var covers = require('./controllers/covers');
var auth = require('./controllers/middlewares/auth');

module.exports = function (app) {
    // Album enpoints
    app.route('/api/albums').post(auth.isAuthenticated, albums.create);
    app.route('/api/albums').get(albums.all);
    app.route('/api/albums/:name').get(albums.getById);
    app.route('/api/albums/:name').delete(auth.isAuthenticated, albums.delete);
    app.route('/api/albums/:name/photos').post(auth.isAuthenticated, albums.addPhotos);
    app.route('/api/albums/:name').put(auth.isAuthenticated, albums.update);
    app.route('/api/albums/:name/photos/:photo_id').delete(auth.isAuthenticated, albums.deletePhoto);
    
    // Cover enpoints
    app.route('/api/covers').post(auth.isAuthenticated, covers.create);
    app.route('/api/covers').get(covers.all);
    app.route('/api/covers/:_id').get(covers.getById);
    app.route('/api/covers/:_id').put(auth.isAuthenticated, covers.update);

    // User enpoints
    app.route('/api/users').post(auth.isAuthenticated, users.create);
    app.route('/api/users/:username').get(auth.isAuthenticated, users.getByUsername);
    app.route('/api/users/:user_id').get(auth.isAuthenticated, users.getById);
    app.route('/api/users').put(auth.isAuthenticated, users.update);
    app.route('/api/users/:user_id').delete(auth.isAuthenticated, users.delete);
    app.route('/api/users').get(auth.isAuthenticated, users.all);
    
    // Contact endpoints
    app.route('/api/contact/send-email').post(contact.sendEmail);
    app.route('/api/contact').get(contact.get);
    app.route('/api/contact').put(auth.isAuthenticated,contact.update)

};
