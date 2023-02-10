"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Server = void 0;
var server_1 = __importDefault(require("./server"));
var client_1 = __importDefault(require("./client"));
exports.Server = server_1.default;
exports.Client = client_1.default;
exports.default = { Server: exports.Server, Client: exports.Client };
