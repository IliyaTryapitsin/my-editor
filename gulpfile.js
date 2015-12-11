var gulp      = require ('gulp');
var path      = require ('path');
var minify    = require ('gulp-minify');
var minifyCss = require ('gulp-minify-css');
var uglify    = require ('gulp-uglify');
var concat    = require ('gulp-concat');
var watch     = require ('gulp-watch');
var batch     = require ('gulp-batch');
var rubySass  = require ('gulp-ruby-sass');
var yargs     = require ('yargs');
var If        = require ('gulp-if');
var notify    = require ('gulp-notify');
var html2js   = require ('gulp-html2js');
var Server;

try {
    Server = require ('karma').Server;
} catch ( ex ) {
}

var isRelease = yargs.argv.release != undefined;
var isDebuf   = yargs.argv.debug   != undefined;

var cssDestPath  = './example/css/';
var jsDestPath   = './example/js/';
var fontDestPath = './example/fonts/';

var cssDepDestName = 'style.css';
var jsDepDestName  = 'lib.js';
var jsAppDestName  = 'my-editor.js';

var sassDepPaths = [
    './node_modules/bootstrap-sass/assets/stylesheets/'
];

var cssDepPaths = [

];

var fontDepPaths = [
    './node_modules/bootstrap-sass/assets/fonts/**/*'
];
var jsDepPaths = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/angular/angular.js',
    './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
];

var jsAppPaths = [
    './js/*.js'
];

var htmlTpl = [
    './js/tpl/*.html'
];

var watchFiles = [
    './js/**/*.js',
    './js/**/*.html',
    './scss/**/*.scss'
];

var minifyPipe = minify ({
    exclude:     ['tasks'  ],
    ignoreFiles: ['-min.js']
});

gulp.task ('lib', function () {

    // Compile SASS
    rubySass ('./scss', {
        precision: 6,
        stopOnError: true,
        loadPath: sassDepPaths
    })
        .pipe (concat (cssDepDestName))
        .pipe (If (isRelease, minifyCss ()))
        .pipe (gulp.dest (cssDestPath))
        .on   ('error', notify);

    // Copy fonts
    gulp
        .src  (fontDepPaths)
        .pipe (gulp.dest (fontDestPath))
        .on   ('error', notify);

    // Concatinate all JS files in one and minify if build for production
    gulp
        .src  (jsDepPaths)
        .pipe (concat (jsDepDestName))
        .pipe (If (isRelease, minifyPipe))
        .pipe (gulp.dest (jsDestPath))
        .on   ('error', notify);

    // Compile HTML templates
    gulp.src (htmlTpl)
        .pipe (html2js({
            base: './js/',
            outputModuleName: 'my-editor-tpl',
            useStrict: true
        }))
        .pipe (concat('my-editor-tpl.js'))
        .pipe (gulp.dest(jsDestPath))
        .on   ('error', notify);

    gulp.src (cssDepPaths)
        .pipe (gulp.dest(cssDestPath))
        .on   ('error', notify);
});

gulp.task ('build', function () {
    gulp
        .src  (jsAppPaths)
        .pipe (concat (jsAppDestName))
        .pipe (gulp.dest (jsDestPath))
        .on   ('error', notify);
});

gulp.task ('watch', function () {
    watch (watchFiles, batch (function (events, done) {
        gulp.start ('lib', done);
        gulp.start ('build', done);
    }));
});
//gulp.task ('test-client', function () {
//    new Server ({
//        configFile: __dirname + '/sample.config.js',
//        singleRun: true
//    }).start ();
//});

gulp.task ('default', [
    'lib',
    'build'
]);