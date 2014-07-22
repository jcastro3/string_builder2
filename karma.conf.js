/**
 * Created by jcastro on 7/21/2014.
 */
module.exports = function(config) {

    config.set({
        basePath: 'src/',
        frameworks: ['jasmine'],
        files: ['**.js'],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 600000,
        singleRun: false

    });
};