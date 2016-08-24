module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),



        // Task configuration will be written here
        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'dist/ngMapAutocComplete.min.js': ['src/ngMapAutocomplete.js']
                }
            }
        }
    });

    // Loading of tasks and registering tasks will be written here
};