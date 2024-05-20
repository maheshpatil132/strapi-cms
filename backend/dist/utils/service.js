"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateToken = ({ id, name }) => {
    return jsonwebtoken_1.default.sign({ id, name }, "mahesh");
};
exports.CreateToken = CreateToken;
