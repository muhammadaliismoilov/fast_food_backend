"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    host: "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: "postgres",
    database: process.env.DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    logging: false
});
sequelize.authenticate().then(() => {
    console.log("Databazaga muvaffaqiyatli ulandi");
}).catch((error) => console.log(error.message));
sequelize.sync({ force: false });
console.log("Jadval sinxronlashtirildi!");
exports.default = sequelize;
// const sequelizes = new Sequelize("sqlite::memory:"); // Sizning DB sozlamangizni kiriting
// const models = {
//     Categorys,
//     Products,
// };
// Object.values(models).forEach((model: any) => {
//     if (model.associate) {
//         model.associate(models);
//     }
// });
// export { sequelizes, Categorys, Products };
// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// import { Categorys } from "../Model/categorys.models"; 
// import { Products } from "../Model/prodacts.model";
// dotenv.config();
// // PostgreSQL uchun Sequelize instansi
// const sequelize = new Sequelize({
//     host: "localhost",
//     port: Number(process.env.DB_PORT) || 5432,
//     username: "postgres",
//     database: process.env.DATABASE_NAME as string,
//     password: process.env.DB_PASSWORD as string,
//     dialect: "postgres",
//     logging: false,
// });
// // Autentifikatsiya va sinxronizatsiya
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Databazaga muvaffaqiyatli ulandi");
//         return sequelize.sync({ force: false });
//     })
//     .then(() => {
//         console.log("Jadval sinxronlashtirildi!");
//     })
//     .catch((error) => {
//         console.error("Xato yuz berdi:", error.message);
//     });
// // Modellarni birlashtirish
// const models = {
//     Categorys,
//     Products,
// };
// // Aloqalarni sozlash
// Object.values(models).forEach((model: any) => {
//     if (model.associate) {
//         model.associate(models);
//     }
// });
// // Faqat bitta instansni eksport qilish
// export { sequelize, Categorys, Products };
