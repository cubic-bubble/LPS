"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./lib/utils");
var Client = /** @class */ (function () {
    function Client(options) {
        this.userAgent = 'LPS/RM';
        this.clientId = 'OPAC-12-09HH--$0';
        if (options === null || options === void 0 ? void 0 : options.userAgent)
            this.userAgent = options.userAgent;
        if (options === null || options === void 0 ? void 0 : options.clientId)
            this.clientId = options.clientId;
    }
    Client.prototype.Request = function (api, method, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var options = {
                method: method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'lps-user-agent': _this.userAgent,
                    'lps-client-id': _this.clientId
                }
            };
            if (data)
                options.body = JSON.stringify(data);
            if (window !== undefined)
                window
                    .fetch("/lpstore".concat(api !== '/' ? api : ''), options)
                    .then(function (res) { return !res.ok ? reject(res.status) : res.json(); })
                    .then(resolve)
                    .catch(reject);
        });
    };
    // Store new item (metadata)
    Client.prototype.set = function (metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, message, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Request('/', 'POST', metadata)];
                    case 1:
                        _a = _b.sent(), error = _a.error, message = _a.message, result = _a.result;
                        if (error)
                            throw new Error(message);
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _b.sent();
                        console.log('Failed setting item(s) to the store: ', error_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get an items details
    Client.prototype.get = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, message, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Request("".concat(query ? "?".concat((0, utils_1.Obj2Params)(query)) : '/'))];
                    case 1:
                        _a = _b.sent(), error = _a.error, message = _a.message, result = _a.result;
                        if (error)
                            throw new Error(message);
                        return [2 /*return*/, result];
                    case 2:
                        error_2 = _b.sent();
                        console.log('Failed Retreiving from the store: ', error_2);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Fetch items by query
    Client.prototype.fetch = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, message, result, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Request("/fetch".concat(query ? "?".concat((0, utils_1.Obj2Params)(query)) : ''))];
                    case 1:
                        _a = _b.sent(), error = _a.error, message = _a.message, result = _a.result;
                        if (error)
                            throw new Error(message);
                        return [2 /*return*/, result];
                    case 2:
                        error_3 = _b.sent();
                        console.log('Failed Fetching items from the store: ', error_3);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update item (metadata)
    Client.prototype.update = function (sid, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, message, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Request('/', 'PATCH', { sid: sid, updates: updates })];
                    case 1:
                        _a = _b.sent(), error = _a.error, message = _a.message, result = _a.result;
                        if (error)
                            throw new Error(message);
                        return [2 /*return*/, result];
                    case 2:
                        error_4 = _b.sent();
                        console.log('Failed Updating the store: ', error_4);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Delete item from store
    Client.prototype.remove = function (sid) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, message, result, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Request("?sid=".concat(sid), 'DELETE')];
                    case 1:
                        _a = _b.sent(), error = _a.error, message = _a.message, result = _a.result;
                        if (error)
                            throw new Error(message);
                        return [2 /*return*/, result];
                    case 2:
                        error_5 = _b.sent();
                        console.log('Failed Updating the store: ', error_5);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
