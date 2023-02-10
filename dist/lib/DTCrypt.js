"use strict";
/**
 * -------------------------------------
 *  DTCrypt: Delta Token Data Encryption
 ** --------------------------------------
 *
 * @version 1.0
 * @author Fabrice Marlboro
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var rand_token_1 = __importDefault(require("rand-token"));
function reverse(str) {
    return str.split('').reverse().join('');
}
/**
 * Encrypt
 *
 * Generate encrypted string token of
 * any typeof data: String, Object, Number, ...
 *
 * @param {mixed} arg
 * @return {string}
 */
var encrypt = function (arg) {
    var argtype = typeof arg, key = rand_token_1.default.generate(58);
    arg = reverse(argtype == 'object' ? JSON.stringify(arg) : String(arg));
    var str = "".concat(crypto_js_1.default.AES.encrypt(arg, key).toString(), ":").concat(argtype), token = '', i = 0;
    // Add random string of 8 length here
    str = rand_token_1.default.generate(8) + str + rand_token_1.default.generate(6);
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    do {
        var a = str.charCodeAt(i++), b = str.charCodeAt(i++), c = str.charCodeAt(i++);
        a = a ? a : 0;
        b = b ? b : 0;
        c = c ? c : 0;
        var b1 = (a >> 2) & 0x3F, b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xF), b3 = ((b & 0xF) << 2) | ((c >> 6) & 0x3), b4 = c & 0x3F;
        if (!b)
            b3 = b4 = 64;
        else if (!c)
            b4 = 64;
        token += b64.charAt(b1) + b64.charAt(b2) + b64.charAt(b3) + b64.charAt(b4);
    } while (i < str.length);
    return "".concat(token, "$").concat(reverse(key));
};
exports.encrypt = encrypt;
/**
 * Decrypt
 *
 * Reverse encrypted string token to its
 * original data format.
 *
 * @param {string} input
 * @return {mixed}
 */
var decrypt = function (input) {
    // Default Reverse Encrypting Tool: Modified Base64 decoder
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', _a = input.split('$'), token = _a[0], key = _a[1];
    var predata = '', i = 0;
    do {
        var b1 = b64.indexOf(token.charAt(i++)), b2 = b64.indexOf(token.charAt(i++)), b3 = b64.indexOf(token.charAt(i++)), b4 = b64.indexOf(token.charAt(i++)), a = ((b1 & 0x3F) << 2) | ((b2 >> 4) & 0x3), b = ((b2 & 0xF) << 4) | ((b3 >> 2) & 0xF), c = ((b3 & 0x3) << 6) | (b4 & 0x3F);
        predata += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
    } while (i < token.length);
    predata = predata.replace(predata.slice(0, 8), '')
        .replace(predata.slice(predata.length - 6), '');
    var _b = predata.split(':'), data = _b[0], datatype = _b[1];
    data = reverse(crypto_js_1.default.AES.decrypt(data, reverse(key)).toString(crypto_js_1.default.enc.Utf8));
    // Return the argument in its encoding type
    switch (datatype) {
        case 'number': return +data;
        case 'object': return JSON.parse(data);
        case 'boolean': return Boolean(data);
        default: return data; // String
    }
};
exports.decrypt = decrypt;
exports.default = { encrypt: exports.encrypt, decrypt: exports.decrypt };
