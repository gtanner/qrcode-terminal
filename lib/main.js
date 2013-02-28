var QRCode = require('./../vendor/qrcode'),
    QRErrorCorrectLevel = require('./../vendor/QRErrorCorrectLevel'),
    colors = require('colors');

module.exports = {
    generate: function (text, cb) {
        var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrcode.addData(text);
        qrcode.make();

        var border = new Array(qrcode.getModuleCount() + 3).join('  ').white.inverse + "\n",
            output = "";

        output += border;
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            output += "  ".white.inverse;

            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    output += "  ";
                }
                else {
                    output += "  ".white.inverse;
                }
            }	

            output += "  ".white.inverse + "\n";
        }
        output += border;

        if (cb) cb(output);
        else console.log(output);
    }
};
