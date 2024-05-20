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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUser = exports.DeleteUser = exports.UpdateUser = exports.CreateUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const CatchAsync_1 = require("../utils/CatchAsync");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const service_1 = require("../utils/service");
const CreateUser = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        return next((0, ErrorHandler_1.ApiError)(402, "Please fill all the details"));
    }
    const exist = yield db_1.default.user.findUnique({
        where: {
            email: email
        }
    });
    if (exist) {
        return next((0, ErrorHandler_1.ApiError)(302, "User Already Exist"));
    }
    const User = yield db_1.default.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });
    const token = (0, service_1.CreateToken)({ id: User.id, name: User.name });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });
    res.status(200).json({
        message: "User Created SuccessFully",
        User,
        token
    });
}));
exports.CreateUser = CreateUser;
const UpdateUser = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore 
    const UserId = req.user;
    console.log(UserId);
    const exist = yield db_1.default.user.findUnique({
        where: {
            id: UserId
        }
    });
    console.log(exist);
    if (!exist) {
        return next((0, ErrorHandler_1.ApiError)(404, "User is not found"));
    }
    const User = yield db_1.default.user.update({
        where: {
            id: UserId
        },
        data: Object.assign({}, req.body)
    });
    res.status(200).json({
        message: "User Updated SuccessFully",
        User
    });
}));
exports.UpdateUser = UpdateUser;
const DeleteUser = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const exist = yield db_1.default.user.findUnique({
        where: {
            id: Number(userId)
        }
    });
    if (!exist) {
        return next((0, ErrorHandler_1.ApiError)(404, "User is not found"));
    }
    const User = yield db_1.default.user.delete({
        where: {
            id: Number(userId)
        }
    });
    res.status(200).json({
        message: "User deleted SuccessFully",
        User
    });
}));
exports.DeleteUser = DeleteUser;
const GetAllUser = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Users = yield db_1.default.user.findMany({});
    res.status(200).json({
        Users
    });
}));
exports.GetAllUser = GetAllUser;
