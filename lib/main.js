var QRCode = require('./../vendor/qrcode'),
    QRErrorCorrectLevel = require('./../vendor/QRErrorCorrectLevel'),
    colors = require('colors');

module.exports = {
    render: function (text) {

        //HACK: the two is QRErrorCorrectLevel.H
        var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrcode.addData(text);
        qrcode.make();


        var border = new Array(qrcode.getModuleCount() + 3).join('  ').white.inverse;
        console.log(border);
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            var str = "  ".white.inverse;

            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    str += "  ";
                }
                else {
                    str += "  ".white.inverse;
                }
            }	

            str += "  ".white.inverse;
            console.log(str);
        }
        console.log(border);
    }
};
