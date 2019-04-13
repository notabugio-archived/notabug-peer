"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Oracle = /** @class */ (function () {
    function Oracle(peer) {
        this.features = [];
        this.peer = peer;
        this.peer.gun.on('put', this.onPut.bind(this));
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