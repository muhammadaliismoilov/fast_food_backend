"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = exports.AccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_SECRET_KEY || "your_access_secret_key";
const REFRESH_SEKRET_KEY = process.env.REFRESH_SEKRET_KEY || "your_refresh_secret_key";
// const ACCESS_TOKEN_EXPIRY: string = "15m"; // Access token 15 daqiqa
// const REFRESH_TOKEN_EXPIRY: string = "7d"; // Refresh token 7 kun
const AccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};
exports.AccessToken = AccessToken;
const RefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, REFRESH_SEKRET_KEY, { expiresIn: "7d" });
};
exports.RefreshToken = RefreshToken;
