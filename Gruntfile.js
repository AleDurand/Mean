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
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
    grunt.registerTask('default', ['uglify']); // Default grunt tasks maps to grunt
  };

