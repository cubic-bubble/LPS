"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var express_1 = require("express");
var DTCrypt_1 = require("./lib/DTCrypt");
var utils_1 = require("./lib/utils");
var STORAGES = {
    filesystem: function (options) {
        var storePath = options.path;
        function getCollection() {
            return __awaiter(this, void 0, void 0, function () {
                var content, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fs_extra_1.default.readFile("".concat(storePath, "/data"))];
                        case 1:
                            content = _a.sent();
                            if (content)
                                content = (0, DTCrypt_1.decrypt)(content);
                            return [2 /*return*/, content || []];
                        case 2:
                            error_1 = _a.sent();
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function storeCollection(list) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fs_extra_1.default.ensureDir(storePath)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, fs_extra_1.default.writeFile("".concat(storePath, "/data"), (0, DTCrypt_1.encrypt)(list))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        return {
            insert: function (input) { return __awaiter(void 0, void 0, void 0, function () {
                var list, sids, each;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!input)
                                throw new Error('Invalid method call. Expected 1 argument');
                            return [4 /*yield*/, getCollection()];
                        case 1:
                            list = _a.sent(), sids = [], each = function (metadata) {
                                for (var x in list) {
                                    var _a = list[x], type = _a.type, nsi = _a.nsi, name_1 = _a.name, namespace = _a.namespace, version = _a.version;
                                    if (type == metadata.type
                                        && nsi == metadata.nsi
                                        && name_1 == metadata.name
                                        && namespace == metadata.namespace
                                        && version == metadata.version) {
                                        sids.push(list[x].sid); // Record existing item Store ID (sid)
                                        return;
                                    }
                                }
                                var sid = (0, utils_1.ruuid)();
                                list.push(__assign({ sid: sid }, metadata));
                                sids.push(sid);
                            };
                            Array.isArray(input) ? input.map(each) : each(input);
                            // Store update
                            return [4 /*yield*/, storeCollection(list)];
                        case 2:
                            // Store update
                            _a.sent();
                            return [2 /*return*/, Array.isArray(input) ? sids : sids[0]];
                    }
                });
            }); },
            get: function (conditions) { return __awaiter(void 0, void 0, void 0, function () {
                var list, x, each, nomatch, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getCollection()];
                        case 1:
                            list = _a.sent();
                            for (x in list) {
                                each = list[x];
                                nomatch = false;
                                for (key in conditions)
                                    if (each[key] != conditions[key]) {
                                        nomatch = true;
                                        break;
                                    }
                                if (nomatch)
                                    continue;
                                else
                                    return [2 /*return*/, each];
                            }
                            return [2 /*return*/, null];
                    }
                });
            }); },
            delete: function (sid) { return __awaiter(void 0, void 0, void 0, function () {
                var list, _a, _b, _c, _i, x;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, getCollection()];
                        case 1:
                            list = _d.sent();
                            _a = list;
                            _b = [];
                            for (_c in _a)
                                _b.push(_c);
                            _i = 0;
                            _d.label = 2;
                        case 2:
                            if (!(_i < _b.length)) return [3 /*break*/, 5];
                            _c = _b[_i];
                            if (!(_c in _a)) return [3 /*break*/, 4];
                            x = _c;
                            if (!(sid == list[x].sid)) return [3 /*break*/, 4];
                            list.splice(x, 1);
                            // Store update
                            return [4 /*yield*/, storeCollection(list)];
                        case 3:
                            // Store update
                            _d.sent();
                            return [2 /*return*/, 'Deleted'];
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: throw new Error('Not Found');
                    }
                });
            }); },
            update: function (sid, updates) { return __awaiter(void 0, void 0, void 0, function () {
                var list, updated, x;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getCollection()];
                        case 1:
                            list = _a.sent();
                            updated = false;
                            delete updates.sid; // Cannot override sid (unique store id)
                            for (x in list)
                                if (sid == list[x].sid) {
                                    list[x] = __assign(__assign({}, list[x]), updates);
                                    updated = true;
                                    break;
                                }
                            if (!updated) return [3 /*break*/, 3];
                            return [4 /*yield*/, storeCollection(list)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, 'Updated'];
                        case 3: throw new Error('Not Found');
                    }
                });
            }); },
            fetch: function (filters) { return __awaiter(void 0, void 0, void 0, function () {
                var list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getCollection()
                            // Return all or filtered list
                        ];
                        case 1:
                            list = _a.sent();
                            // Return all or filtered list
                            return [2 /*return*/, !filters ? list : list.filter(function (each) {
                                    for (var key in filters)
                                        if (each[key] != filters[key])
                                            return false;
                                    return true;
                                })];
                    }
                });
            }); }
        };
    },
    mongodb: function (options) {
        var collection = options.collection;
        if (!collection || !collection.insertOne)
            throw new Error('Invalid MongoDB Collection Object');
        return {
            insert: function (input) { return __awaiter(void 0, void 0, void 0, function () {
                function checkExists(_a) {
                    var type = _a.type, nsi = _a.nsi, namespace = _a.namespace;
                    return __awaiter(this, void 0, void 0, function () {
                        var exists;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, collection.findOne({ type: type, nsi: nsi, namespace: namespace })];
                                case 1:
                                    exists = _b.sent();
                                    if (!exists)
                                        return [2 /*return*/];
                                    return [2 /*return*/, exists.sid];
                            }
                        });
                    });
                }
                var sids_1, itemId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!input)
                                throw new Error('Invalid method call. Expected 1 argument');
                            if (Array.isArray(input)) {
                                sids_1 = [];
                                Promise.all(input.map(function (each) {
                                    var itemId = checkExists(each);
                                    if (itemId)
                                        return sids_1.push(itemId);
                                    sids_1.push(each.sid = (0, utils_1.ruuid)());
                                    collection.insertOne(each);
                                }));
                                return [2 /*return*/, sids_1];
                            }
                            itemId = checkExists(input);
                            if (itemId)
                                return [2 /*return*/, itemId];
                            input.sid = (0, utils_1.ruuid)();
                            return [4 /*yield*/, collection.insertOne(input)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, input.sid];
                    }
                });
            }); },
            get: function (conditions) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.findOne(conditions)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); },
            fetch: function (filters) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.find(filters || {}).toArray()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); },
            update: function (sid, updates) { return __awaiter(void 0, void 0, void 0, function () {
                var acknowledged;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, collection.updateOne({ sid: sid }, { $set: updates })];
                        case 1:
                            acknowledged = (_a.sent()).acknowledged;
                            if (!acknowledged)
                                throw new Error('Not Found');
                            return [2 /*return*/, 'Updated'];
                    }
                });
            }); },
            delete: function (sid) { return __awaiter(void 0, void 0, void 0, function () {
                var acknowledged;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, collection.deleteOne({ sid: sid })];
                        case 1:
                            acknowledged = (_a.sent()).acknowledged;
                            if (!acknowledged)
                                throw new Error('Not Found');
                            return [2 /*return*/, 'Deleted'];
                    }
                });
            }); }
        };
    }
}, SERVERS = {
    express: function (App, Storage) {
        var route = (0, express_1.Router)()
            .use(function (req, res, next) {
            if (req.headers['lps-user-agent'] !== 'LPS/RM' ||
                req.headers['lps-client-id'] !== 'OPAC-12-09HH--$0')
                return res.status(403).send('Access Denied');
            next();
        })
            .post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!Object.keys(req.body).length)
                            throw new Error('Invalid Request Body');
                        return [4 /*yield*/, Storage.insert(req.body)];
                    case 1:
                        result = _a.sent();
                        res.json({
                            error: false,
                            result: result
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.json({
                            error: true,
                            message: error_2.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })
            .get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!Object.keys(req.query).length)
                            throw new Error('Undefined Request Query');
                        return [4 /*yield*/, Storage.get(req.query)];
                    case 1:
                        result = _a.sent();
                        res.json({
                            error: false,
                            result: result
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.json({
                            error: true,
                            message: error_3.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })
            .get('/fetch', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Storage.fetch(req.query || {})];
                    case 1:
                        result = _a.sent();
                        res.json({
                            error: false,
                            result: result
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.json({
                            error: true,
                            message: error_4.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })
            .patch('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, sid, updates, result, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, sid = _a.sid, updates = _a.updates;
                        if (!sid || typeof updates !== 'object')
                            throw new Error('Invalid Request Parameters');
                        if (!Object.keys(updates).length)
                            throw new Error('Undefined Update Fields');
                        return [4 /*yield*/, Storage.update(sid, updates)];
                    case 1:
                        result = _b.sent();
                        res.json({
                            error: false,
                            result: result
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        res.json({
                            error: true,
                            message: error_5.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })
            .delete('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.query.sid)
                            throw new Error('Invalid Request Parameters');
                        return [4 /*yield*/, Storage.delete(req.query.sid)];
                    case 1:
                        result = _a.sent();
                        res.json({
                            error: false,
                            result: result
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        res.json({
                            error: true,
                            message: error_6.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        App.use('/lpstore', route);
    },
    fastify: function (App, Storage) {
        var route = function (instance) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                instance
                    .addHook('preHandler', function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (req.headers['lps-user-agent'] !== 'LPS/RM' ||
                            req.headers['lps-client-id'] !== 'OPAC-12-09HH--$0') {
                            rep.code(403);
                            throw new Error('Access Denied');
                        }
                        return [2 /*return*/];
                    });
                }); })
                    .post('/', function (req) { return __awaiter(void 0, void 0, void 0, function () {
                    var result, error_7;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                if (!Object.keys(req.body).length)
                                    throw new Error('Invalid Request Body');
                                return [4 /*yield*/, Storage.insert(req.body)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, { error: false, result: result }];
                            case 2:
                                error_7 = _a.sent();
                                return [2 /*return*/, { error: true, message: error_7.message }];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })
                    .get('/', function (req) { return __awaiter(void 0, void 0, void 0, function () {
                    var query, result, error_8;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                query = req.query || {};
                                if (!Object.keys(query).length)
                                    throw new Error('Undefined Request Query');
                                return [4 /*yield*/, Storage.get(query)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, { error: false, result: result }];
                            case 2:
                                error_8 = _a.sent();
                                return [2 /*return*/, { error: true, message: error_8.message }];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })
                    .get('/fetch', function (req) { return __awaiter(void 0, void 0, void 0, function () {
                    var query, result, error_9;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                query = req.query || {};
                                return [4 /*yield*/, Storage.fetch(query)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, { error: false, result: result }];
                            case 2:
                                error_9 = _a.sent();
                                return [2 /*return*/, { error: true, message: error_9.message }];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })
                    .patch('/', function (req) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, sid, updates, result, error_10;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                _a = req.body, sid = _a.sid, updates = _a.updates;
                                if (!sid || typeof updates !== 'object')
                                    throw new Error('Invalid Request Parameters');
                                if (!Object.keys(updates).length)
                                    throw new Error('Undefined Update Fields');
                                return [4 /*yield*/, Storage.update(sid, updates)];
                            case 1:
                                result = _b.sent();
                                return [2 /*return*/, { error: false, result: result }];
                            case 2:
                                error_10 = _b.sent();
                                return [2 /*return*/, { error: true, message: error_10.message }];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })
                    .delete('/', function (req) { return __awaiter(void 0, void 0, void 0, function () {
                    var sid, result, error_11;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                sid = req.query.sid;
                                if (!sid)
                                    throw new Error('Invalid Request Parameters');
                                return [4 /*yield*/, Storage.delete(sid)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, { error: false, result: result }];
                            case 2:
                                error_11 = _a.sent();
                                return [2 /*return*/, { error: true, message: error_11.message }];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        App.register(route, { prefix: '/lpstore' });
    }
};
var Server = /** @class */ (function () {
    function Server(options, Server) {
        this.serverType = 'express';
        this.storageType = 'filesystem';
        this.path = "".concat(process.cwd(), "/.lps");
        if (options === null || options === void 0 ? void 0 : options.serverType)
            this.serverType = options.serverType;
        if (options === null || options === void 0 ? void 0 : options.storageType)
            this.storageType = options.storageType;
        if (options === null || options === void 0 ? void 0 : options.path)
            this.path = options.path;
        this.Server = Server;
        if (this.storageType && !STORAGES[this.storageType])
            throw new Error("LPS does not support <".concat(this.storageType, "> storage"));
        switch (this.storageType) {
            case 'mongodb':
                {
                    if (!(options === null || options === void 0 ? void 0 : options.collection))
                        throw new Error('Undefined MongoDb Storage collection');
                    this.Storage = STORAGES.mongodb({ collection: options.collection });
                }
                break;
            case 'filesystem':
            default: this.Storage = STORAGES.filesystem({ path: this.path });
        }
    }
    Server.prototype.listen = function () {
        if (!this.Server)
            throw new Error('Undefined HTTP Server');
        switch (this.serverType) {
            case 'express':
                SERVERS[this.serverType](this.Server, this.Storage);
                break;
            case 'fastify':
                SERVERS[this.serverType](this.Server, this.Storage);
                break;
        }
    };
    return Server;
}());
exports.default = Server;
