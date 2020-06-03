#!/usr/bin/env node

const qrcode = require('../lib/main');

const argv = require('yargs')
    .demandCommand(1)
    .alias('s', 'small')
    .describe('s', 'output smaller qrcode') 
    .alias('v', 'version')
    .describe('v', 'output version number')
    .help('h')
    .alias('h', 'help')
    .argv;

const [input] = argv._;
input && qrcode.generate(input, argv.s && {small: true});