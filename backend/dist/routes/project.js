"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectController_1 = require("../controller/ProjectController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/create', auth_1.Authentication, ProjectController_1.CreateProject);
router.get('/getall', ProjectController_1.GetAllProject);
router.get('/myproject', auth_1.Authentication, ProjectController_1.GetMyProject);
router.put('/update/:id', auth_1.Authentication, ProjectController_1.UpdateProject);
router.delete('/delete/:id', auth_1.Authentication, ProjectController_1.DeleteProject);
exports.default = router;
