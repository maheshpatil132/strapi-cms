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
exports.GetSingleValue = exports.GetAllValues = exports.DeleteValue = exports.UpdateValue = exports.InsertValue = void 0;
const db_1 = __importDefault(require("../config/db"));
const CatchAsync_1 = require("../utils/CatchAsync");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const InsertValue = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Attribute_id = req.params.id;
    const { value } = req.body;
    const attribute = yield db_1.default.attributes.findUnique({
        where: { id: Number(Attribute_id) },
        select: { type: true },
    });
    if (!attribute) {
        return next((0, ErrorHandler_1.ApiError)(404, "Attribute not found"));
    }
    if (typeof attribute.type !== typeof value) {
        return next((0, ErrorHandler_1.ApiError)(303, "Invalid value type"));
    }
    const Newvalue = yield db_1.default.value.create({
        data: {
            attributeId: Number(Attribute_id),
            value: value
        },
    });
    res.status(200).json({
        sucess: true,
        message: "New entity Created Succesfully",
        Newvalue,
    });
}));
exports.InsertValue = InsertValue;
const UpdateValue = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const valueId = req.params.id;
    const { value } = req.body;
    const existingValue = yield db_1.default.value.findFirst({
        where: { id: Number(valueId) },
        select: {
            attribute: true
        }
    });
    if (!existingValue) {
        return next((0, ErrorHandler_1.ApiError)(404, 'Value not found'));
    }
    console.log(existingValue.attribute, typeof value);
    if (typeof existingValue.attribute.type !== typeof value) {
        return next((0, ErrorHandler_1.ApiError)(303, "Invalid value type"));
    }
    const UpdatedValue = yield db_1.default.value.update({
        where: { id: Number(valueId) },
        data: {
            value: String(value),
        },
    });
    res.status(200).json({
        sucess: true,
        message: 'Value updated successfully',
        UpdatedValue,
    });
}));
exports.UpdateValue = UpdateValue;
const DeleteValue = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const valueId = req.params.id;
    const existingValue = yield db_1.default.value.findFirst({
        where: { id: Number(valueId) },
        select: {
            attribute: true
        }
    });
    if (!existingValue) {
        return next((0, ErrorHandler_1.ApiError)(404, 'Value not found'));
    }
    yield db_1.default.value.delete({
        where: {
            id: Number(valueId),
        },
    });
    res.status(200).json({
        sucess: true,
        message: "Value deleted Succesfully",
    });
}));
exports.DeleteValue = DeleteValue;
const GetAllValues = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const attributeId = req.params.id;
    const Attributes = yield db_1.default.value.findMany({
        where: {
            attributeId: Number(attributeId),
        },
    });
    res.status(200).json({
        sucess: true,
        Attributes,
    });
}));
exports.GetAllValues = GetAllValues;
const GetSingleValue = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const valueId = req.params.id;
    const value = yield db_1.default.value.findUnique({
        where: {
            id: Number(valueId),
        },
    });
    if (!value)
        next((0, ErrorHandler_1.ApiError)(404, "value not found"));
    res.status(200).json({
        sucess: true,
        value
    });
}));
exports.GetSingleValue = GetSingleValue;
