const isProd = process.argv.includes("--production");
const isDev = !isProd;

module.exports = {
    isProd: isProd,
    isDev: isDev,

    htmlmin: {
        collapseWhitespace: isProd,
    },
    htmlBeautify: {
        indent_size: 4,
        preserve_newlines: false,
    },
    cssBeautify: {
        indent_size: 2,
        preserve_newlines: false,
    },
    jsBeautify: {
        indent_size: 4,
        preserve_newlines: false,
    },
    webpack: {
        //mode: "development",
        mode: isProd ? "production" : "development",
    },
    imagemin: {
        verbose: true,
    },
    fonter: {
        formats: ["ttf", "woff", "eot", "svg"],
    },
};
