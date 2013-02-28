var expect = require("expect.js"),
    qrcode = require('./../lib/main'),
    sinon = require("sinon");

describe('in the main module', function() {
    describe("the generate method", function () {
        describe("when not providing a callback", function () {
            beforeEach(function () {
                sinon.stub(console, "log");
            });

            afterEach(function () {
                sinon.sandbox.restore();
                console.log.reset();
            });

            it("logs to the console", function () {
                qrcode.generate("test");
                expect(console.log.called).to.be(true);
            });
        });

        describe("when providing a callback", function () {
            it("will call the callback", function () {
                var cb = sinon.spy();
                qrcode.generate("test", cb);
                expect(cb.called).to.be(true);
            });

            it("will not call the console.log method", function () {
                qrcode.generate("test", sinon.spy());
                expect(console.log.called).to.be(false);
            });
        });
    });
});
