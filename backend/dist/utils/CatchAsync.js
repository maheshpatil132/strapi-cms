"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchAsync = void 0;
const CatchAsync = (thefun) => {
    return (req, res, next) => {
        Promise.resolve(thefun(req, res, next)).catch((err) => next(err));
    };
};
exports.CatchAsync = CatchAsync;
