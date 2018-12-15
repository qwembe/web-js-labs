const gulp = require("gulp4");
const pug = require("gulp-pug");
const del = require("del");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const debug = require("gulp-debug");
const uglify = require("gulp-uglify")
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const imageResize = require("gulp-image-resize")


//const fs = require("fs");

gulp.task("hello2", (callback) => {
    console.log("hello!!!");
    callback()
});

gulp.task("html:index", () => {
    return gulp.src("src/views/index.pug")
        .pipe(pug({
            locals: {title: "Welcome to auction! "}
        }))
        .pipe(gulp.dest("public/"))
})


gulp.task("html:list_of_paintings", () => {

    //const data = require("./picture_data.json")
    return gulp.src("src/views/list_of_paintings.pug")
        .pipe(pug({
            locals: {
                title: "List of paintings!",
                //data: data
            }
        }))
        .pipe(gulp.dest("public/"))
})

gulp.task("html:bidders", () => {

    //const data = require("./picture_data.json")
    return gulp.src("src/views/bidders.pug")
        .pipe(pug({
            locals: {
                title: "List of bidders!",
                //data: data
            }
        }))
        .pipe(gulp.dest("public/"))
})

gulp.task("html:settings", () => {

    //const data = require("./picture_data.json")
    return gulp.src("src/views/settings.pug")
        .pipe(pug({
            locals: {
                title: "Settings!!",
                //data: data
            }
        }))
        .pipe(gulp.dest("public/"))
})

gulp.task("scripts", () => {
    return gulp.src("src/scripts/*.js",)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("public/javascript"))

})

gulp.task("styles", () => {
    return gulp.src("src/cssless/*.less")
        .pipe(sourcemap.init())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(concat("style.css"))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest("public/stylesheets/"))
})

gulp.task("clean", () => {
    return del("public/**/*.{html,css,js,jpg,ico}")

})

gulp.task("images", ()=>{
        gulp.src("src/images/*.*")
        .pipe(gulp.dest("public/images/"))
    return gulp.src("src/images/*.jpg")
        .pipe(imageResize({
            width : 50,
            height : 50,
            crop : true,
            upscale : false
        }))
        .pipe(rename({
            extname: ".ico"
        }))
        .pipe(gulp.dest("public/images/ico"))
})

gulp.task("watch", () => {
    gulp.watch("src/views/*.pug", gulp.parallel("html:index", "html:list_of_paintings","html:bidders","html:settings"))
    gulp.watch("src/scripts/*.js", gulp.parallel("scripts"))
    gulp.watch("src/cssless/*.less", gulp.series("styles"))
    gulp.watch("src/images/*.jpg", gulp.series("images"))

})


gulp.task("serve", () => {
    browserSync.init({
        proxy: "https://localhost:3000",
        //server: "public"
    })

    browserSync.watch("public/**/*.*").on("change", browserSync.reload);
})

gulp.task("default", () => {
    //gulp.parallel("html:index", "html:list_of_paintings","html:bidders")
    return gulp.src("node_modules/jquery/dist/*.*")
        .pipe(gulp.dest("public/javascript/jq/"));
})

gulp.task("dev", gulp.series(gulp.parallel("default", "watch", "serve")))

