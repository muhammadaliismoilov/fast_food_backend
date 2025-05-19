"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.categorySchema = joi_1.default.object({
    category: joi_1.default.string().min(2).max(50).required().messages({
        "string.empty": "Kategoriya nomi bo'sh bo'lmasligi kerak",
        "string.base": "Kategoriya stringda kiritilishi kerak!",
        "string.min": "Kategoriya nomi kamida 2 belgidan iborat bo'lishi kerak",
        "string.max": "Kategoriya nomi 50 belgidan oshmasligi kerak",
        "any.required": "Kategoriya nomi kiritilishi shart",
    }),
}).options({ abortEarly: false });
