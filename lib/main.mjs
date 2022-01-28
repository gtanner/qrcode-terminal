import QRCode from "./../vendor/QRCode/index.mjs";
import QRErrorCorrectLevel from "./../vendor/QRCode/QRErrorCorrectLevel.mjs";

const black = "\x1b[40m  \x1b[0m",
  white = "\x1b[47m  \x1b[0m",
  toCell = function (isBlack) {
    return isBlack ? black : white;
  },
  repeat = function (color) {
    return {
      times: function (count) {
        return new Array(count).join(color);
      },
    };
  },
  fill = function (length, value) {
    const arr = new Array(length);
    for (let i = 0; i < length; i++) {
      arr[i] = value;
    }
    return arr;
  };

export let error = QRErrorCorrectLevel.L;

export const generate = function (input, opts, cb) {
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }

  const qrcode = new QRCode(-1, error);
  qrcode.addData(input);
  qrcode.make();

  let output = "";
  if (opts && opts.small) {
    const BLACK = true, WHITE = false;
    const moduleCount = qrcode.getModuleCount();
    const moduleData = qrcode.modules.slice();

    const oddRow = moduleCount % 2 === 1;
    if (oddRow) {
      moduleData.push(fill(moduleCount, WHITE));
    }

    const platte = {
      WHITE_ALL: "\u2588",
      WHITE_BLACK: "\u2580",
      BLACK_WHITE: "\u2584",
      BLACK_ALL: " ",
    };

    const borderTop = repeat(platte.BLACK_WHITE).times(moduleCount + 3);
    const borderBottom = repeat(platte.WHITE_BLACK).times(moduleCount + 3);
    output += borderTop + "\n";

    for (let row = 0; row < moduleCount; row += 2) {
      output += platte.WHITE_ALL;

      for (let col = 0; col < moduleCount; col++) {
        if (
          moduleData[row][col] === WHITE &&
          moduleData[row + 1][col] === WHITE
        ) {
          output += platte.WHITE_ALL;
        } else if (
          moduleData[row][col] === WHITE &&
          moduleData[row + 1][col] === BLACK
        ) {
          output += platte.WHITE_BLACK;
        } else if (
          moduleData[row][col] === BLACK &&
          moduleData[row + 1][col] === WHITE
        ) {
          output += platte.BLACK_WHITE;
        } else {
          output += platte.BLACK_ALL;
        }
      }

      output += platte.WHITE_ALL + "\n";
    }

    if (!oddRow) {
      output += borderBottom;
    }
  } else {
    const border = repeat(white).times(qrcode.getModuleCount() + 3);

    output += border + "\n";
    qrcode.modules.forEach(function (row) {
      output += white;
      output += row.map(toCell).join("");
      output += white + "\n";
    });
    output += border;
  }

  if (cb) cb(output);
  else console.log(output);
};

export const setErrorLevel = function (newLevel) {
  error = QRErrorCorrectLevel[newLevel] || error;
};
