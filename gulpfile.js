// Gulp loader

const {
    src,
    dest,
    task,
    watch,
    series,
    parallel
} = require('gulp');

// --------------------------------------------
// Dependencies
// --------------------------------------------

// CSS / SASS plugins
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let minifycss = require('gulp-clean-css');



// Utility plugins
let concat = require('gulp-concat');
let del = require('del');
let plumber = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');
let rename = require('gulp-rename');



// Project Variables

let styleSrc = 'source/sass/**/*.sass';
let styleDest = 'styles';




// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------


// Compiles SASS files
function css(done) {
    src('source/sass/**/*.sass')
        .pipe(plumber())
        .pipe(sass({
            style: 'compressed'
        }))
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))

        .pipe(dest('styles/css'));
    done();
};


// Watch for changes
function watcher() {
    watch(styleSrc, series(css));
    watch(['styles/*.css']);
};


// use default task to launch Browsersync and watch JS files
let build = parallel(watcher);
task('default', build);
