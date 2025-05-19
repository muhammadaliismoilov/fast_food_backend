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
exports.deleteAdmin = exports.updateAdmin = exports.createAdmin = exports.getOneAdmin = exports.getAllAdmins = exports.logout = exports.login = void 0;
const auth_model_1 = require("../Model/auth.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_generate_1 = require("../utils/token.generate");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        if (!login || !password) {
            return res.status(400).json({ message: "login va parol yuborilishi kerak!" });
        }
        const found = yield auth_model_1.Admins.findOne({ where: { login } });
        if (!found)
            return res.status(401).json({ message: "Topilmadi" });
        const decode = yield bcryptjs_1.default.compare(password, found.password);
        if (!decode)
            return res.status(401).json({ message: "Login yoki parol xato!" });
        const payload = {
            id: found.id,
            login: found.login,
            role: found.role
        };
        const access = (0, token_generate_1.AccessToken)(payload);
        const refresh = (0, token_generate_1.RefreshToken)(payload);
        res.cookie("accessToken", access, {
            httpOnly: true,
            maxAge: 30 * 60 * 1000,
        });
        res.cookie("refreshToken", refresh, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "Tizimga muvaffaqiyatli kirdingiz", access });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login } = req.body;
        if (!login) {
            return res.status(400).json({ message: "Email kerak!" });
        }
        const found = yield auth_model_1.Admins.findOne({ where: { login } });
        if (!found) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });
        }
        res.clearCookie("accessToken", { httpOnly: true });
        res.clearCookie("refreshToken", { httpOnly: true });
        return res.status(200).json({
            message: "Tizimdan muvaffaqiyatli chiqdingiz!",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
const getAllAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAll = yield auth_model_1.Admins.findAll();
        return res.status(200).json(findAll);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAdmins = getAllAdmins;
const getOneAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAdmin = yield auth_model_1.Admins.findByPk(+req.params.id);
        if (!findAdmin)
            res.status(404).json({ mesage: "Admin topilmadi" });
        return res.status(200).json(findAdmin);
    }
    catch (error) {
        next(error);
    }
});
exports.getOneAdmin = getOneAdmin;
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        const findLogin = yield auth_model_1.Admins.findOne({ where: { login: req.body.login } });
        if (findLogin)
            return res.status(400).json({ message: "Login bazada mavjud" });
        const hashed = yield bcryptjs_1.default.hash(password, 10);
        const newAdmin = yield auth_model_1.Admins.create({
            login,
            password: hashed,
            role: "admin"
        });
        return res.status(201).json({ message: "Admin qo`shildi", newAdmin });
    }
    catch (error) {
        next(error);
    }
});
exports.createAdmin = createAdmin;
const updateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        const findAdmin = yield auth_model_1.Admins.findByPk(+req.params.id);
        if (!findAdmin)
            return res.status(404).json({ message: "Admin topilmadi" });
        const updates = {};
        if (login)
            updates.login = login;
        if (password) {
            const hashed = yield bcryptjs_1.default.hash(password, 10);
            updates.hashed = hashed;
        }
        if (!login && !password)
            return res.status(400).json({ message: "Hech qanday ma'lumot kiritilmadi" });
        yield findAdmin.update(updates);
        return res.status(200).json({ message: "Admin ma'lumotlari yangilandi", admin: findAdmin });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAdmin = yield auth_model_1.Admins.findByPk(+req.params.id);
        if (!findAdmin)
            res.status(404).json({ mesage: "Admin topilmadi" });
        findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.destroy();
        return res.status(200).json({ message: "Admin muvoffaqiyatli o`chirildi" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAdmin = deleteAdmin;
