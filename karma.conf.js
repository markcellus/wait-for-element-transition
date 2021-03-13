require('dotenv').config();

const tsconfig = require('./tsconfig.json');

module.exports = function (config) {
    config.set({
        files: ['tests/**/*.ts', '*.ts'],

        preprocessors: {
            '**/*.ts': ['karma-typescript'],
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                module: 'commonjs',
                sourceMap: true,
                target: 'es6',
            },
            exclude: ['node_modules'],
        },
        browserStack: {
            username: process.env.BROWSERSTACK_USERNAME,
            accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        },
        customLaunchers: {
            chrome: {
                base: 'BrowserStack',
                browser: 'chrome',
                os: 'OS X',
                os_version: 'Big Sur',
            },
            safari: {
                base: 'BrowserStack',
                os: 'OS X',
                os_version: 'Big Sur',
                browser: 'safari',
            },
            edge: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '10',
                browser: 'edge',
            },
            firefox: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '10',
                browser: 'firefox',
            },
            ios: {
                base: 'BrowserStack',
                device: 'iPhone X',
                os: 'ios',
                real_mobile: true,
                os_version: '11.0',
            },
        },
        browsers: ['chrome', 'firefox', 'safari', 'edge', 'ios'],
        reporters: ['progress'],
        frameworks: ['mocha', 'karma-typescript'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: true,
        concurrency: Infinity,
    });
};
