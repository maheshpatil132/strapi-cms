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
exports.GetMyProject = exports.GetAllProject = exports.DeleteProject = exports.UpdateProject = exports.CreateProject = void 0;
const db_1 = __importDefault(require("../config/db"));
const CatchAsync_1 = require("../utils/CatchAsync");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const CreateProject = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const UserId = req.user;
    const { projectName } = req.body;
    if (!projectName) {
        return next((0, ErrorHandler_1.ApiError)(302, "ProjectName is required"));
    }
    const Project = yield db_1.default.project.findFirst({
        where: {
            name: projectName,
            userId: Number(UserId),
        },
    });
    if (Project) {
        return next((0, ErrorHandler_1.ApiError)(422, "Project name should be unique"));
    }
    const NewProject = yield db_1.default.project.create({
        data: {
            name: projectName,
            userId: Number(UserId),
        },
    });
    res.status(200).json({
        sucess: true,
        message: "New project Created Succesfully",
        NewProject,
    });
}));
exports.CreateProject = CreateProject;
const UpdateProject = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.user;
    const projectId = Number(req.params.id);
    const { name } = req.body;
    const existingProject = yield db_1.default.project.findUnique({
        where: {
            id: projectId,
            userId: Number(userId),
        },
    });
    // If the project does not exist, return a 404 error
    if (!existingProject) {
        return next((0, ErrorHandler_1.ApiError)(404, "Project not found"));
    }
    // Check if project with the same name already exists for the user
    const existingProjectWithName = yield db_1.default.project.findFirst({
        where: {
            name,
            userId: Number(userId),
            NOT: { id: projectId } // Exclude current project
        },
    });
    if (existingProjectWithName) {
        return next((0, ErrorHandler_1.ApiError)(400, "Project name must be unique"));
    }
    const updatedProject = yield db_1.default.project.update({
        where: {
            id: projectId,
            userId: userId,
        },
        data: Object.assign({}, req.body),
    });
    if (!updatedProject)
        return next((0, ErrorHandler_1.ApiError)(404, "Project not found"));
    res.status(200).json({
        sucess: true,
        message: "Project Updated Successfully",
        updatedProject,
    });
}));
exports.UpdateProject = UpdateProject;
const GetAllProject = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Projects = yield db_1.default.project.findMany({});
    res.status(200).json({
        sucess: true,
        Projects,
    });
}));
exports.GetAllProject = GetAllProject;
const DeleteProject = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ProjectID = Number(req.params.id);
    const existingProject = yield db_1.default.project.findUnique({
        where: {
            id: ProjectID,
        },
    });
    if (!existingProject) {
        return next((0, ErrorHandler_1.ApiError)(404, "Project not found"));
    }
    const Project = yield db_1.default.project.delete({
        where: {
            id: ProjectID,
        },
    });
    if (!Project)
        return next((0, ErrorHandler_1.ApiError)(404, "Project not exist"));
    res.status(404).json({
        sucess: true,
        message: "Project deleted Sucessfully",
    });
}));
exports.DeleteProject = DeleteProject;
const GetMyProject = (0, CatchAsync_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const UserId = req.user;
    const Projects = yield db_1.default.project.findMany({
        where: {
            userId: UserId,
        },
        include: {
            entities: {
                include: {
                    attributes: {
                        include: {
                            values: true
                        }
                    }
                }
            }
        }
    });
    res.status(200).json({
        sucess: true,
        Projects,
    });
}));
exports.GetMyProject = GetMyProject;
