import QRMode from './QRMode.mjs';

class QR8bitByte {
    constructor(data) {
        this.mode = QRMode.MODE_8BIT_BYTE;
        this.data = data;
    }

    getLength() {
		return this.data.length;
	}

    write(buffer) {
		for (let i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
}

export default QR8bitByte;
