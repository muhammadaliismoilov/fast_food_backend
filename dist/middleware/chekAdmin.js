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
exports.chekAdmin = exports.chekSuperadmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const chekSuperadmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token topilamdi" });
        }
        const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || "your_access_secret_key";
        const accesToken = authHeader.slice(7);
        const decode = jsonwebtoken_1.default.verify(accesToken, ACCESS_SECRET_KEY);
        if (!decode.role || decode.role !== "superadmin") {
            return res.status(403).json({ message: "Sizda Superadmin huquqlari yo'q" });
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.chekSuperadmin = chekSuperadmin;
const chekAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token topilamdi" });
        }
        const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || "your_access_secret_key";
        const accesToken = authHeader.slice(7);
        const decode = jsonwebtoken_1.default.verify(accesToken, ACCESS_SECRET_KEY);
        if (!decode.role || decode.role !== "admin") {
            return res.status(403).json({ message: "Sizda admin huquqlari yo'q" });
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.chekAdmin = chekAdmin;
