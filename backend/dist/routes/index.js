"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const project_1 = __importDefault(require("./project"));
const attribute_1 = __importDefault(require("./attribute"));
const entity_1 = __importDefault(require("./entity"));
const value_1 = __importDefault(require("./value"));
const router = express_1.default.Router();
router.use('/user', user_1.default);
router.use('/project', project_1.default);
router.use('/attribute', attribute_1.default);
router.use('/entity', entity_1.default);
router.use('/value', value_1.default);
exports.default = router;
