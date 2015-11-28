module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'jasmine'],
    autoWatch: true,
    logLevel: config.LOG_INFO,
    logColors: true,
    browsers: ['Chrome'],
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 30000,
    files: [
      // simple pattern to load the needed testfiles
      // equal to {pattern: 'test/unit/*.spec.js', watched: true, served: true, included: true}
      'test/*.spec.js'
    ],
    preprocessors: {
      'test/*.spec.js': [ 'browserify' ]
    },

    browserify: {
      debug: true
    }
  });
};