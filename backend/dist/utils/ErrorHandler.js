"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ErrorHandler extends Error {
    constructor(status, message, stack) {
        super(message);
        (this.message = message), (this.status = status);
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
const ApiError = (status, message) => {
    return new ErrorHandler(status, message);
};
exports.ApiError = ApiError;
