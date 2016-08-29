module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      app : {
        src : 'public/application.js',
        dest: 'public/application.js'
      }
    },
    cssmin: {
      all: {
        options: {
            keepSpecialComments: 0
        },
        files: [{
             expand: true,
             src: ['public/**/*.css'],
             dest: '.',
             ext:'.css'
          }]
      }
    },
    concat: {
      js_app: {
        src: [
          'client/modules/**/app.js', 
          'client/modules/**/routes.js', 
          'client/modules/**/services/**/*.js',
          'client/modules/**/controllers/**/*.js',
          'client/modules/**/directives/**/*.js'
        ],
        dest: 'public/application.js'
      }
    },
    copy: {
      prod: {
        files: [
          { expand: true, cwd: 'client/', src: ['**/*.html'], dest: 'public/' },
          { expand: true, cwd: 'client/libraries', src: ['**/*'], dest: 'public/libraries' },
          { expand: true, cwd: 'client/resources', src: ['**/*'], dest: 'public/resources' }
        ]
      },
      dev: {
        files: [
          { expand: true, cwd: 'client/', src: ['index.html'], dest: 'public/' }
        ]
      }
    },
    clean: {
      public: ['public/**/*']
    },
    includeSource: {
      options: {
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
          }
        }
      },
      dev : {
        options: {
          basePath: 'client/'
        },
        files: {
          'public/index.html': 'client/index.html'
        }
      },
      prod : {
        options: {
          basePath: 'public/'
        },
        files: {
          'public/index.html': 'client/index.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify'); 
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-include-source');

  grunt.registerTask('default', ['clean', 'copy:prod', 'concat', 'uglify', 'cssmin', 'includeSource:prod']);
  grunt.registerTask('prod', ['clean', 'copy:prod', 'concat', 'uglify', 'cssmin', 'includeSource:prod']); 
  grunt.registerTask('dev', ['clean', 'copy:dev', 'includeSource:dev']); 
};