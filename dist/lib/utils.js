"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obj2Params = exports.ruuid = void 0;
var ruuid = function () {
    return 'xxxx-xxxx-4xxxx-xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.ruuid = ruuid;
var Obj2Params = function (obj, excludes) {
    return typeof obj == 'object' ?
        Object.entries(obj)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            if (!Array.isArray(excludes) || !excludes.includes(key))
                return "".concat(key, "=").concat(value);
        }).join('&') : '';
};
exports.Obj2Params = Obj2Params;
