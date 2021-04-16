var QRCode = require('./../vendor/QRCode'),
    QRErrorCorrectLevel = require('./../vendor/QRCode/QRErrorCorrectLevel'),
    black = "\033[40m  \033[0m",
    white = "\033[47m  \033[0m",
    toCell = function (isBlack) {
        return isBlack ? black : white;
    }
    toCellInverted = function (isBlack) {
        return isBlack ? white : black;
    },
    repeat = function (color) {
        return {
            times: function (count) {
                return new Array(count).join(color);
            }
        };
    },
    fill = function(length, value) {
        var arr = new Array(length);
        for (var i = 0; i < length; i++) {
            arr[i] = value;
        }
        return arr;
    };

module.exports = {

    error: QRErrorCorrectLevel.L,

    generate: function (input, opts, cb) {
        if (typeof opts === 'function') {
            cb = opts;
            opts = {};
        }

        var qrcode = new QRCode(-1, this.error);
        qrcode.addData(input);
        qrcode.make();

        var output = '';
        if (opts && opts.small) {
            var BLACK = true, WHITE = false;
            var moduleCount = qrcode.getModuleCount();
            var moduleData = qrcode.modules.slice();

            var oddRow = moduleCount % 2 === 1;
            if (oddRow) {
                moduleData.push(fill(moduleCount, WHITE));
            }

            var platte= {
                WHITE_ALL: '\u2588',
                WHITE_BLACK: '\u2580',
                BLACK_WHITE: '\u2584',
                BLACK_ALL: ' ',
            };

            if(opts.inverted) {
                var clone = Object.assign({}, platte);
                platte.WHITE_ALL = clone.BLACK_ALL;
                platte.WHITE_BLACK = clone.BLACK_WHITE;
                platte.BLACK_WHITE = clone.WHITE_BLACK;
                platte.BLACK_ALL = clone.WHITE_ALL;
            }

            var borderTop = repeat(platte.BLACK_WHITE).times(moduleCount + 3);
            var borderBottom = repeat(platte.WHITE_BLACK).times(moduleCount + 3);
            output += !opts.inverted ? borderTop : repeat(platte.WHITE_ALL).times(moduleCount + 3) + '\n';

            for (var row = 0; row < moduleCount; row += 2) {
                output += platte.WHITE_ALL;

                for (var col = 0; col < moduleCount; col++) {
                    if (moduleData[row][col] === WHITE && moduleData[row + 1][col] === WHITE) {
                        output += platte.WHITE_ALL;
                    } else if (moduleData[row][col] === WHITE && moduleData[row + 1][col] === BLACK) {
                        output += platte.WHITE_BLACK;
                    } else if (moduleData[row][col] === BLACK && moduleData[row + 1][col] === WHITE) {
                        output += platte.BLACK_WHITE;
                    } else {
                        output += platte.BLACK_ALL;
                    }
                }

                output += platte.WHITE_ALL + '\n';
            }

            if (!oddRow) {
                output += borderBottom;
            }
        } else {
            var flip = opts && opts.inverted;
            var border = repeat(flip ? black : white).times(qrcode.getModuleCount() + 3);

            output += border + '\n';
            qrcode.modules.forEach(function (row) {
                output += flip ? black : white;
                output += row.map( (opts && opts.inverted) ? toCellInverted : toCell).join('');
                output += (flip ? black : white) + '\n';
            });
            output += border;
        }

        if (cb) cb(output);
        else console.log(output);
    },

    setErrorLevel: function (error) {
        this.error = QRErrorCorrectLevel[error] || this.error;
    }

};
