import { generate } from '../lib/main.mjs';

const url = 'https://google.com/';

generate(url, { small: true }, function (qr) {
    console.log(qr);
});
