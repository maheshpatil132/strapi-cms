"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ValueController_1 = require("../controller/ValueController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/:id/insert', auth_1.Authentication, ValueController_1.InsertValue);
router.get('/getall/:id', auth_1.Authentication, ValueController_1.GetAllValues);
router.get('/:id', auth_1.Authentication, ValueController_1.GetSingleValue);
router.put('/update/:id', auth_1.Authentication, ValueController_1.UpdateValue);
router.delete('/delete/:id', auth_1.Authentication, ValueController_1.DeleteValue);
exports.default = router;
