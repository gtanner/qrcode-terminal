#!/usr/bin/env node

/*!
 * Module dependencies.
 */

var qrcode = require('../lib/main'),
    path = require('path'),
    fs = require('fs'),
    parseArgs = require('minimist');

/*!
 * Parse the process name and input
 */
var argv = parseArgs(process.argv, opts={});

var name = argv._[1].replace(/^.*[\\\/]/, '').replace('.js', ''),
    input = argv._[2];

/*!
 * Display help
 */
if (typeof argv.h !== 'undefined' || typeof argv.help !== 'undefined') {
    help();
    process.exit();
}

/*!
 * Display version
 */
if (typeof argv.v !== 'undefined' || typeof argv.version !== 'undefined') {
    version();
    process.exit();
}

/*!
 * Error correction level
 */
if (typeof argv.e !== 'undefined' && typeof argv.e === 'string') {
    qrcode.setErrorLevel(argv.e.toUpperCase());
} else if (typeof argv.errorcorrectlevel !== 'undefined' && typeof argv.errorcorrectlevel === 'string') {
    qrcode.setErrorLevel(argv.errorcorrectlevel.toUpperCase());
}

/*!
 * Render the QR Code
 */
if (typeof input !== 'undefined') {
    qrcode.generate(input);
}

/*!
 * Helper functions
 */

function help() {
    console.log([
        '',
        'Usage: ' + name + ' <message>',
        '',
        'Options:',
        '  -e [L|M|Q|H], --errorcorrectlevel=[L|M|Q|H]   set error correction level (Default: L)',
        '  -h, --help                                    output usage information',
        '  -v, --version                                 output version number',
        '',
        'Examples:',
        '',
        '  $ ' + name + ' hello',
        '  $ ' + name + ' "hello world"',
        '  $ ' + name + ' -e Q "hello world"',
        ''
    ].join('\n'));
}

function version() {
    var packagePath = path.join(__dirname, '..', 'package.json'),
        packageJSON = JSON.parse(fs.readFileSync(packagePath), 'utf8');

    console.log(packageJSON.version);
}
