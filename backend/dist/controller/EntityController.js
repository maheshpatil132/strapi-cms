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
exports.DeleteEntity = exports.GetEntity = exports.GetAllEntities = exports.UpdateEntity = exports.CreateEntity = void 0;
const db_1 = __importDefault(require("../config/db"));
const CatchAsync_1 = require("../utils/CatchAsync");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const CreateEntity = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ProjectId = req.params.id;
    const { entityName } = req.body;
    if (!entityName) {
        return next((0, ErrorHandler_1.ApiError)(404, "Entity name required"));
    }
    const existingEntity = yield db_1.default.entity.findFirst({
        where: {
            name: entityName,
            projectId: Number(ProjectId)
        }
    });
    if (existingEntity) {
        return next((0, ErrorHandler_1.ApiError)(203, "entity name should be unique"));
    }
    const NewEntity = yield db_1.default.entity.create({
        data: {
            name: entityName,
            projectId: Number(ProjectId)
        }
    });
    res.status(200).json({
        sucess: true,
        message: "New entity Created Succesfully",
        NewEntity
    });
}));
exports.CreateEntity = CreateEntity;
const UpdateEntity = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const EntityId = req.params.id;
    const exist = yield db_1.default.entity.findFirst({
        where: {
            id: Number(EntityId)
        }
    });
    if (!exist)
        return next((0, ErrorHandler_1.ApiError)(404, "Entity is not exist"));
    const UpdatedEntity = yield db_1.default.entity.update({
        where: {
            id: Number(EntityId)
        },
        data: {
            name: req.body.name
        }
    });
    res.status(200).json({
        sucess: true,
        message: "entity Updated Succesfully",
        UpdatedEntity
    });
}));
exports.UpdateEntity = UpdateEntity;
const DeleteEntity = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const EntityId = req.params.id;
    const exist = yield db_1.default.entity.findFirst({
        where: {
            id: Number(EntityId)
        }
    });
    if (!exist)
        return next((0, ErrorHandler_1.ApiError)(404, "Entity is not exist"));
    yield db_1.default.entity.delete({
        where: {
            id: Number(EntityId)
        }
    });
    res.status(200).json({
        sucess: true,
        message: "entity deleted Succesfully",
    });
}));
exports.DeleteEntity = DeleteEntity;
const GetAllEntities = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ProjectId = req.params.id;
    const existProject = yield db_1.default.project.findFirst({
        where: {
            id: Number(ProjectId)
        }
    });
    if (!existProject)
        return next((0, ErrorHandler_1.ApiError)(404, "Project is not exist"));
    const entities = yield db_1.default.entity.findMany({
        where: {
            projectId: Number(ProjectId)
        }
    });
    res.status(200).json({
        sucess: true,
        entities
    });
}));
exports.GetAllEntities = GetAllEntities;
const GetEntity = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const EntityId = req.params.id;
    const entity = yield db_1.default.entity.findUnique({
        where: {
            id: Number(EntityId)
        }
    });
    if (!entity)
        next((0, ErrorHandler_1.ApiError)(404, 'entity not found'));
    res.status(200).json({
        sucess: true,
        entity
    });
}));
exports.GetEntity = GetEntity;
