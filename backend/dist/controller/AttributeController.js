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
exports.GetAttribute = exports.DeleteAttribute = exports.GetAllAttributes = exports.UpdateAttribute = exports.CreateAtribute = void 0;
const db_1 = __importDefault(require("../config/db"));
const CatchAsync_1 = require("../utils/CatchAsync");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const CreateAtribute = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const entityId = req.params.id;
    let { attributeName, typeName } = req.body;
    attributeName = attributeName.toLowerCase();
    if (!attributeName || !typeName) {
        return next((0, ErrorHandler_1.ApiError)(404, "atribute name and type is required"));
    }
    const entity = yield db_1.default.entity.findFirst({
        where: {
            id: Number(entityId)
        }
    });
    if (!entity)
        return next((0, ErrorHandler_1.ApiError)(404, "entity not exist"));
    const existingAttribute = yield db_1.default.attributes.findFirst({
        where: {
            name: attributeName,
            entityId: Number(entityId),
        }
    });
    if (existingAttribute) {
        return next((0, ErrorHandler_1.ApiError)(203, "attribute name should be unique"));
    }
    const NewAttribute = yield db_1.default.attributes.create({
        data: {
            name: attributeName,
            entityId: Number(entityId),
            type: typeName
        }
    });
    res.status(200).json({
        sucess: true,
        message: "New entity Created Succesfully",
        NewAttribute
    });
}));
exports.CreateAtribute = CreateAtribute;
const CreateManyAttribute = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const entityId = req.params.id;
    let { attributeName, typeName } = req.body;
    attributeName = attributeName.toLowerCase();
    if (!attributeName || !typeName) {
        return next((0, ErrorHandler_1.ApiError)(404, "atribute name and type is required"));
    }
    const entity = yield db_1.default.entity.findFirst({
        where: {
            id: Number(entityId)
        }
    });
    if (!entity)
        return next((0, ErrorHandler_1.ApiError)(404, "entity not exist"));
    const existingAttribute = yield db_1.default.attributes.findFirst({
        where: {
            name: attributeName,
            entityId: Number(entityId),
        }
    });
    if (existingAttribute) {
        return next((0, ErrorHandler_1.ApiError)(203, "attribute name should be unique"));
    }
    const NewAttribute = yield db_1.default.attributes.create({
        data: {
            name: attributeName,
            entityId: Number(entityId),
            type: typeName
        }
    });
    res.status(200).json({
        sucess: true,
        message: "New entity Created Succesfully",
        NewAttribute
    });
}));
const UpdateAttribute = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const attributeId = req.params.id;
    const entityId = req.params.entity;
    const exist = yield db_1.default.attributes.findFirst({
        where: {
            id: Number(attributeId)
        }
    });
    if (!exist)
        return next((0, ErrorHandler_1.ApiError)(404, "Attribute is not exits"));
    const existAttributeName = yield db_1.default.attributes.findFirst({
        where: {
            name: (req.body.name).toLowerCase(),
            entityId: Number(entityId),
        }
    });
    if (existAttributeName)
        return next((0, ErrorHandler_1.ApiError)(300, "Attribute name should be unique"));
    const UpdatedAttribute = yield db_1.default.attributes.update({
        where: {
            id: Number(attributeId),
            entityId: Number(entityId)
        },
        data: {
            name: (req.body.name).toLowerCase()
        }
    });
    res.status(200).json({
        sucess: true,
        message: "Attribute Updated Succesfully",
        UpdatedAttribute
    });
}));
exports.UpdateAttribute = UpdateAttribute;
const DeleteAttribute = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const attributeId = req.params.id;
    const exist = yield db_1.default.attributes.findFirst({
        where: {
            id: Number(attributeId)
        }
    });
    if (!exist)
        return next((0, ErrorHandler_1.ApiError)(404, "Attribute is not exits"));
    yield db_1.default.attributes.delete({
        where: {
            id: Number(attributeId)
        }
    });
    res.status(200).json({
        sucess: true,
        message: "Attribute deleted Succesfully",
    });
}));
exports.DeleteAttribute = DeleteAttribute;
const GetAllAttributes = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const EntityId = req.params.id;
    const Attributes = yield db_1.default.attributes.findMany({
        where: {
            entityId: Number(EntityId)
        }
    });
    res.status(200).json({
        sucess: true,
        Attributes
    });
}));
exports.GetAllAttributes = GetAllAttributes;
const GetAttribute = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const AttributeId = req.params.id;
    const Attribute = yield db_1.default.attributes.findUnique({
        where: {
            id: Number(AttributeId)
        }
    });
    if (!Attribute)
        next((0, ErrorHandler_1.ApiError)(404, 'Attribute not found'));
    res.status(200).json({
        sucess: true,
        Attribute
    });
}));
exports.GetAttribute = GetAttribute;
