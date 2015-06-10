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
      html: {
        expand: true,
        cwd: 'app/',
        src: '*.html',
        dest: 'tmp/public/',
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
    }
  });

  grunt.registerTask('default', ['clean', 'emberTemplates', 'concat', 'copy', 'connect', 'watch']);
};
