const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done){
    
    src('src/scss/app.scss')//identificar archivo sass
        .pipe(sass())//compilador
        .pipe(dest("build/css"));//almacenar en disco duro
    

    

    done();//callback
}

exports.css = css;