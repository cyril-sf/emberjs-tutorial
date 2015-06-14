module.exports = function(grunt) {
  require('matchdep').
    filterDev('grunt-*').
    filter(function(name){ return name !== 'grunt-cli'; }).
      forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: ['tmp'],

    concat: {
      app: {
        src: [
          'tmp/build/templates.js',
          'app/app.js',
          'app/models/**/*.js',
          'app/controllers/**/*.js',
          'app/routes/**/*.js',
        ],
        dest: 'tmp/public/assets/app.js'
      },

      vendor: {
        src: [
          'vendor/jquery/dist/jquery.js',
          'vendor/handlebars/handlebars.js',
          'vendor/ember/ember.js',
        ],
        dest: 'tmp/public/assets/vendor.js'
      }
    },

    copy: {
      app: {
        expand: true,
        cwd: 'app/',
        src: '*.html',
        dest: 'tmp/public/',
        flatten: true,
        filter: 'isFile',
      },

      tests: {
        expand: true,
        cwd: 'tests/',
        src: '*.html',
        dest: 'tmp/public/tests/',
        flatten: true,
        filter: 'isFile',
      }
    },

    connect: {
      server: {
        options: {
          base: 'tmp/public',
          hostname: '*',
        }
      },
    },

    emberTemplates: {
      options: {
        templateBasePath: 'app/templates/',
        templateCompilerPath: 'vendor/ember/ember-template-compiler.js',
        handlebarsPath: 'vendor/handlebars/handlebars.js'
      },
      app: {
        files: {
          'tmp/build/templates.js': ["app/templates/**/*.hbs"]
        }
      }
    },

    watch: {
      app: {
        files: ['app/**/*'],
        tasks: ['dist']
      },

      tests: {
        files: ['tests/**/*'],
        tasks: ['tests']
      }
    }
  });

  grunt.registerTask('dist', ['emberTemplates', 'concat:app', 'copy:app']);
  grunt.registerTask('tests', ['concat:tests', 'copy:tests']);
  grunt.registerTask('default', ['clean', 'dist', 'tests', 'connect', 'watch']);
};
