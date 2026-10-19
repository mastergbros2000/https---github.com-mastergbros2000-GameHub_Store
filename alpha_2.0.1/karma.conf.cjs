const fs = require('node:fs/promises');
const path = require('node:path');
const { createInstrumenter } = require('istanbul-lib-instrument');

// Solo instrumenta nuestro código. No mide dependencias ni los propios tests.
const cobertura = {
    name: 'cobertura-gamehub',
    setup(build) {
        build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
            if (
                !args.path.includes(`${path.sep}src${path.sep}`) ||
                args.path.includes(`${path.sep}tests${path.sep}`)
            )
                return;
            const original = await fs.readFile(args.path, 'utf8');
            const instrumentador = createInstrumenter({
                esModules: true,
                produceSourceMap: true,
                parserPlugins: ['jsx'],
            });
            return {
                contents: instrumentador.instrumentSync(original, args.path),
                loader: 'jsx',
                resolveDir: path.dirname(args.path),
            };
        });
    },
};

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            { pattern: 'src/**/*.spec.js', watched: false, type: 'module' },
            { pattern: 'public/**/*', included: false, served: true, watched: false },
        ],
        proxies: {
            '/imagenes/': '/base/public/imagenes/',
            '/video/': '/base/public/video/',
        },
        preprocessors: { 'src/**/*.spec.js': ['esbuild'] },
        esbuild: {
            define: { 'import.meta.env.BASE_URL': JSON.stringify('/') },
            target: 'es2022',
            jsx: 'automatic',
            loader: { '.js': 'jsx', '.css': 'empty' },
            plugins: [cobertura],
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: 'coverage',
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'json-summary' }],
        },
        browsers: ['ChromeHeadless'],
        customLaunchers: {
            // Solo para contenedores de CI. En el computador se usa ChromeHeadless normal.
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
            },
        },
        singleRun: true,
        colors: true,
        logLevel: config.LOG_INFO,
        concurrency: 1,
    });
};
