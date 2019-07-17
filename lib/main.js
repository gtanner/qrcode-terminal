var QRCode = require('qrcode-generator');

module.exports = {

    errorLevel: 'L',

    generate: function (input, opts, cb) {
        if (typeof opts === 'function') {
            cb = opts;
            opts = {};
        }

        var qrcode = new QRCode(-1, this.errorLevel);
        qrcode.addData(input);
        qrcode.make();

        var output = qrcode.createASCII((opts && opts.small) ? 1 : 2);

        if (cb) cb(output);
        else console.log(output);
    },

    setErrorLevel: function (errorLevel) {
        this.errorLevel = errorLevel || this.errorLevel;
    }

};
