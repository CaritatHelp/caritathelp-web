// Karma configuration
// Generated on Wed Nov 11 2015 19:21:12 GMT+0800 (Chine)

module.exports = function(config) {
  config.set({

	basePath: '',

	frameworks: ['jasmine'],

	files: [
    'public/js/app.min.js',
		'node_modules/angular-mocks/angular-mocks.js',
    'tests/**/*.js'
	],

	exclude: [
		'src/js/**/index.js'
	],

	preprocessors: {
	},

	reporters: ['progress'],

	port: 9876,
	colors: true,
	logLevel: config.LOG_INFO,
	autoWatch: false,

	browsers: ['PhantomJS'],

	singleRun: true,
	concurrency: Infinity
  })
}
