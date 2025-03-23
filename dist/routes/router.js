"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_routes_1 = __importDefault(require("./note.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const router = (0, express_1.Router)();
exports.default = () => {
    (0, auth_routes_1.default)(router);
    (0, note_routes_1.default)(router);
    return router;
};
