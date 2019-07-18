# QRCode Terminal Edition [![Build Status][travis-ci-img]][travis-ci-url]

Render QR codes in a terminal

![Basic Example][basic-example-img]

# Node Library

## Install

Can be installed with:

    $ npm install qrcode-terminal

and used:

    var qrcode = require('qrcode-terminal');

## Usage

To display some data to the terminal just call:

    qrcode.generate('This will be a QRCode, eh!');

The default error correction level is 'L', but you can set it to one of 'L', 'M', 'Q', 'H':

    qrcode.generate('This will be a QRCode with error level Q!', {errorLevel: 'Q'});

A type number may be specified as an integer in the range 1..40 in order to set the data capacity,
according to this [reference table][qrcode-demo-reference]:

    qrcode.generate('This will be a QRCode with data capacity type 7', {typeNumber: 7});

Instead of the default behavior, you can pass a callback to handle the output:

    qrcode.generate('http://github.com', function (qrcode) {
        console.log(qrcode);
    });

If you want to render a smaller output, provide `opts` with `small`:

    qrcode.generate('This will be a small QRCode, eh!', {small: true});

    qrcode.generate('This will be a small QRCode, eh!', {small: true}, function (qrcode) {
        console.log(qrcode)
    });

# Command-Line

## Install

    $ npm install -g qrcode-terminal

## Usage

    $ qrcode-terminal --help
    $ qrcode-terminal 'http://github.com'
    $ echo 'http://github.com' | qrcode-terminal

# Support

- OS X
- Linux
- Windows

# Server-side

[node-qrcode][node-qrcode-url] is a popular server-side QRCode generator that
renders to a `canvas` object.

# Developing

To setup the development envrionment run `yarn install`

To run tests run `yarn test`

# Contributors

    Gord Tanner <gtanner@gmail.com>
    Micheal Brooks <michael@michaelbrooks.ca>
    Ildar Sagdejev <specious@gmail.com>

[travis-ci-img]: https://travis-ci.org/gtanner/qrcode-terminal.png
[travis-ci-url]: https://travis-ci.org/gtanner/qrcode-terminal
[basic-example-img]: https://raw.github.com/gtanner/qrcode-terminal/master/example/basic.png
[node-qrcode-url]: https://github.com/soldair/node-qrcode
[qrcode-demo-reference]: https://kazuhikoarase.github.io/qrcode-generator/js/demo/

