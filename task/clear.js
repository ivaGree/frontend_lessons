// Удаление директории
const del = require("del");

// Конфигурация
const path = require("../config/path.js");

// ************************************************* //
// Удаление public
const clear = () => {
    return del(path.root);
};

module.exports = clear;
