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

// autoprefixer
const autoprefixer = require("gulp-autoprefixer");
// Минификация CSS
const csso = require("gulp-csso");
// для 2х CSS минифицированного и нет
const rename = require("gulp-rename");
// размер файла
const size = require("gulp-size");
// Замена свойств на его краткие формы
const shorthand = require("gulp-shorthand");
// Группировка медиа запросов
const groupCssMediaQueries = require("gulp-group-css-media-queries");

// SASS
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");

// Автозамена изображений на webp
const webpCss = require("gulp-webp-css");

// Бьютифаер
const cssBeautify = require("gulp-beautify");

// ************************************************* //
// Обработка CSS
const scss = () => {
    return src(path.scss.src, { sourcemaps: app.isDev })
        .pipe(
            plumber({
                errorHandler: notify.onError((error) => ({
                    title: "SCSS",
                    message: error.message,
                })),
            })
        )
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(groupCssMediaQueries())
        .pipe(cssBeautify.css(app.cssBeautify))
        .pipe(size({ title: "main.css" }))

        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))

        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min .css" }))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }));
};

module.exports = scss;
