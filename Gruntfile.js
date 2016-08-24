  module.exports = function(grunt) {
  grunt.initConfig({
      uglify: {
        albums_target: {
          files: {
            'public/modules/albums/controllers/albums-index-controller.js': ['public/modules/albums/controllers/albums-index-controller.js'],
            'public/modules/albums/controllers/albums-show-controller.js': ['public/modules/albums/controllers/albums-show-controller.js'],
            'public/modules/albums/directives/fileModel.js': ['public/modules/albums/directives/fileModel.js'],
            'public/modules/albums/services/album-service.js': ['public/modules/albums/services/album-service.js'],
            'public/modules/albums/routes.js': ['public/modules/albums/routes.js']
          }
        },
        contact_target: {
        	files: {
            'public/modules/contact/controllers/contact-index-controller.js': ['public/modules/contact/controllers/contact-index-controller.js'],
            'public/modules/contact/services/contact-service.js': ['public/modules/contact/services/contact-service.js'],
            'public/modules/contact/routes.js': ['public/modules/contact/routes.js']
          }
        },
        slider_target: {
        	files: {
        	'public/modules/slider/controllers/slider-controller.js': ['public/modules/slider/controllers/slider-controller.js'],
        	'public/modules/slider/controllers/slider-edit-controller.js': ['public/modules/slider/controllers/slider-edit-controller.js'],
            'public/modules/slider/directives/slider-directive.js': ['public/modules/slider/directives/slider-directive.js'],
            'public/modules/slider/services/slider-service.js': ['public/modules/slider/services/slider-service.js'],
            'public/modules/slider/routes.js': ['public/modules/slider/routes.js']
        	}
        },
        user_target: {
        	files: {
        	'public/modules/users/controllers/user-login-controller.js': ['public/modules/users/controllers/user-login-controller.js'],
            'public/modules/users/services/user-authentication-service.js': ['public/modules/users/services/user-authentication-service.js'],
            'public/modules/users/services/user-interceptor-service.js': ['public/modules/users/services/user-interceptor-service.js'],
            'public/modules/users/services/user-service.js': ['public/modules/users/services/user-service.js'],
            'public/modules/users/routes.js': ['public/modules/users/routes.js']
        	}
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
    grunt.registerTask('default', ['uglify']); // Default grunt tasks maps to grunt
  };
