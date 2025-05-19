"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.adminSchema = joi_1.default.object({
    login: joi_1.default.string().min(3).max(50).required().messages({
        "string.empty": "Login bo'sh bo'lmasligi kerak",
        "string.base": "Login stringda kerak",
        "string.min": "Login kamida 3 belgidan iborat bo'lishi kerak",
        "string.max": "Login 50 belgidan oshmasligi kerak",
        "any.required": "Login kiritilishi shart",
    }),
    password: joi_1.default.string().min(6).max(100).required().messages({
        "string.empty": "Parol bo'sh bo'lmasligi kerak",
        "string.base": "Parol stringda kerak",
        "string.min": "Parol kamida 6 belgidan iborat bo'lishi kerak",
        "string.max": "Parol 100 belgidan oshmasligi kerak",
        "any.required": "Parol kiritilishi shart",
    }),
    role: joi_1.default.string().valid("admin", "superadmin").required().messages({
        "string.base": "Role stringda kerak",
        "any.only": "Role faqat 'admin' yoki 'superadmin' bo'lishi mumkin",
        "any.required": "Role kiritilishi shart",
    }),
}).options({ abortEarly: false });
