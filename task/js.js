const { src, dest } = require("gulp");
// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");
// ************************************************* //
// Плагины
// Обработчик ошибок
const plumber = require("gulp-plumber");
// Всплывающие сообщения
const notify = require("gulp-notify");
const babel = require("gulp-babel");
// Минификатор   JS
const uglify = require("gulp-uglify");
const webpack = require("webpack-stream");
const rename = require("gulp-rename");

// Бьютифаер
const jsBeautify = require("gulp-beautify");

// ************************************************* //
// Обработка JavaScript
const js = () => {
    return (
        src(path.js.src, { sourcemaps: app.isDev })
            .pipe(
                plumber({
                    errorHandler: notify.onError((error) => ({
                        title: "JavaScript",
                        message: error.message,
                    })),
                })
            )
            .pipe(babel())
            //.pipe(webpack(app.webpack))
            .pipe(jsBeautify.js(app.jsBeautify))
            .pipe(dest(path.js.dest, { sourcemaps: app.isDev }))
            .pipe(rename({ suffix: ".min" }))
            .pipe(uglify())
            .pipe(dest(path.js.dest, { sourcemaps: app.isDev }))
    );
};

module.exports = js;
