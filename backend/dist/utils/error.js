"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const errors = (err, req, res, next) => {
    const message = err.message;
    console.log(err.status);
    res.status(err.status || 500).json({
        sucess: false,
        message: message
    });
};
exports.errors = errors;
