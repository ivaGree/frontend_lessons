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

// Шаблонизатор HTML
const fileInclude = require("gulp-file-include");
// Бьютифаер HTML
const htmlBeautify = require("gulp-beautify");
// Минификатор HTML
const htmlmin = require("gulp-htmlmin");
// Размер файлов
const size = require("gulp-size");
// Подмена изображений на webp если есть
const webpHtml = require("gulp-webp-html");

// ************************************************* //
// Обработка HTML
const html = () => {
    return (
        src(path.html.src)
            .pipe(
                plumber({
                    errorHandler: notify.onError((error) => ({
                        title: "HTML",
                        message: error.message,
                    })),
                })
            )
            .pipe(fileInclude())
            .pipe(webpHtml())
            .pipe(size({ title: "До сжатия:" }))
            //.pipe(htmlmin(app.htmlmin))
            .pipe(size({ title: "После сжатия:" }))

            .pipe(htmlBeautify.html(app.htmlBeautify))
            .pipe(dest(path.html.dest))
    );
};

module.exports = html;
