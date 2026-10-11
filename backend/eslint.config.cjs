const globals = require("globals");

module.exports = [
    {
        files: ["src/**/*.js", "tests/**/*.test.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: globals.node,
        },
        rules: {
            "no-undef": "error",
            "no-unreachable": "error",
        },
    },
];
