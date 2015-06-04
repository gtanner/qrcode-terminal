var QRCode = require('./../vendor/QRCode'),
    QRErrorCorrectLevel = require('./../vendor/QRCode/QRErrorCorrectLevel'),
    black = "\033[40m  \033[0m",
    white = "\033[47m  \033[0m",
    toCell = function (isBlack) {
        return isBlack ? black : white;
    },
    repeat = function (color) {
        return {
            times: function (count) {
                return new Array(count).join(color);
            }
        };
    };

module.exports = {

    error: QRErrorCorrectLevel.L,

    generate: function (input, cb) {
        var qrcode = new QRCode(-1, this.error);
        qrcode.addData(input);
        qrcode.make();

        var output = '',
            border = repeat(white).times(qrcode.getModuleCount() + 3);

        output += border + '\n';
        qrcode.modules.forEach(function (row) {
            output += white;
            output += row.map(toCell).join(''); 
            output += white + '\n';
        });
        output += border;

        if (cb) cb(output);
        else console.log(output);
    },

    setErrorLevel: function (error) {
       this.error = QRErrorCorrectLevel[error] || this.error;
    }

};
