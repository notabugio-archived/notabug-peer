"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Oracle = /** @class */ (function () {
    function Oracle(peer) {
        var onPut = this.onPut.bind(this);
        this.features = [];
        this.peer = peer;
        this.peer.gun.on('put', function (msg) {
            this.to.next(msg);
            onPut(msg);
        });
    }
    Oracle.prototype.use = function (feature) {
        this.features.push(feature);
    };
    Oracle.prototype.onPut = function (msg) {
        for (var i = 0; i < this.features.length; i++)
            this.features[i].onPut(msg);
    };
    return Oracle;
}());
exports.Oracle = Oracle;
//# sourceMappingURL=Oracle.js.map