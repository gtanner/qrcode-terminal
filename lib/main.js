var QRCode = require('qrcode-generator');

module.exports = {

    generate: function (input, opts, cb) {
        if (typeof opts === 'function') {
            cb = opts;
            opts = {};
        }

        opts = opts || {};
        opts.small = opts.small || false;
        opts.errorLevel = opts.errorLevel || 'L';

        var qrcode = new QRCode(-1, opts.errorLevel);
        qrcode.addData(input);
        qrcode.make();

        var output = qrcode.createASCII((opts && opts.small) ? 1 : 2);

        if (cb) cb(output);
        else console.log(output);
    },

};
