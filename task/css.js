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
// Объединение файлов в один
const concat = require("gulp-concat");
// Директива import css в  base.css
const cssimport = require("gulp-cssimport");
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

// Автозамена изображений на webp
const   = require("gulp-webp-css");

// ************************************************* //
// Обработка CSS
const css = () => {
    return src(path.css.src, { sourcemaps: app.isDev })
        .pipe(
            plumber({
                errorHandler: notify.onError((error) => ({
                    title: "CSS",
                    message: error.message,
                })),
            })
        )
        .pipe(concat("main.css"))
        .pipe(cssimport())
		.pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(groupCssMediaQueries())
        .pipe(size({ title: "main.css" }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min .css" }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
};

module.exports = css;
