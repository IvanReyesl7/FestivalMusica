const { src, dest, watch, parallel } = require("gulp");

//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//imagenes
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const avif = require("gulp-avif");

function css(done){
    
    src('src/scss/**/*.scss')//identificar archivo sass
        .pipe(plumber())
        .pipe(sass())//compilador
        .pipe(dest("build/css"));//almacenar en disco duro
    

    

    done();//callback
}


function imagenes(done){

    const opciones = {
        optimizationLevel: 3
    }

    src("src/img/**/*.{png,jpg}")
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'));

    done();
}

function versionWebp(done){

    const opciones = {
        quality: 50
    };

    src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"));

    done();
}


function versionAvif(done){

    const opciones = {
        quality: 50
    };

    src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"));

    done();
}

function dev(done){

    watch('src/scss/**/*.scss',css);

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWebp,versionAvif,dev);