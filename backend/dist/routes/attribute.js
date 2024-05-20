"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AttributeController_1 = require("../controller/AttributeController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/:id/create', auth_1.Authentication, AttributeController_1.CreateAtribute);
router.get('/:id/getall', auth_1.Authentication, AttributeController_1.GetAllAttributes);
router.get('/:id', auth_1.Authentication, AttributeController_1.GetAttribute);
router.put('/update/:entity/attribute/:id', auth_1.Authentication, AttributeController_1.UpdateAttribute);
router.delete('/delete/:id', auth_1.Authentication, AttributeController_1.DeleteAttribute);
exports.default = router;
