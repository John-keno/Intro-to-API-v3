"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqLogger = void 0;
const reqLogger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};
exports.reqLogger = reqLogger;
//# sourceMappingURL=logger.middleware.js.map