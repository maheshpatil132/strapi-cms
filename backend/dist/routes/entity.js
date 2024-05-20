"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EntityController_1 = require("../controller/EntityController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/:id/create', auth_1.Authentication, EntityController_1.CreateEntity);
router.get('/:id/getall', auth_1.Authentication, EntityController_1.GetAllEntities);
router.get('/get/:id', auth_1.Authentication, EntityController_1.GetEntity);
router.put('/update/:id', auth_1.Authentication, EntityController_1.UpdateEntity);
router.delete('/delete/:id', auth_1.Authentication, EntityController_1.DeleteEntity);
exports.default = router;
