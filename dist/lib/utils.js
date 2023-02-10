"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruuid = void 0;
var ruuid = function () {
    return 'xxxx-xxxx-4xxxx-xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.ruuid = ruuid;
