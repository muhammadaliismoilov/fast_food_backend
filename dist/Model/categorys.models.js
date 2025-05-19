"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categorys = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Categorys extends sequelize_1.Model {
}
exports.Categorys = Categorys;
Categorys.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: "Category",
    tableName: "categorys",
    timestamps: true
});
// import { Model, DataTypes, Optional } from "sequelize";
// import { sequelize } from "../config/db";
// import { Products } from "./prodacts.model";
// interface CategoryAttributes {
//     id: number;
//     category: string;
// }
// interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> {}
// export class Categorys extends Model<CategoryAttributes, CategoryCreationAttributes> {
//     public id!: number;
//     public category!: string;
//     public static associate(models: any) {
//         Categorys.hasMany(models.Products, {
//             foreignKey: "category",
//             as: "products"
//         });
//     }
// }
// Categorys.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         category: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     },
//     {
//         sequelize,
//         modelName: "Category",
//         tableName: "categories", // tableName ni "categorys" dan "categories" ga o'zgartirdik
//         timestamps: true,
//     }
// );
// // Aloqani index faylda faollashtirish uchun
// Categorys.associate = (models: any) => {
//     Categorys.hasMany(models.Products, {
//         foreignKey: "category",
//         as: "products"
//     });
// };
