"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Products extends sequelize_1.Model {
}
exports.Products = Products;
Products.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    modelName: "Product",
    tableName: "products",
    timestamps: true
});
// import { Model, DataTypes, Optional } from "sequelize";
// import { sequelize } from "../config/db";
// import { Categorys } from "./categorys.models";
// interface ProductAttributes {
//     id: number;
//     productName: string;
//     categoryId: number; // Kategoriyaga bog'lovchi maydon
//     price: number;
//     description: string;
// }
// interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}
// export class Products extends Model<ProductAttributes, ProductCreationAttributes> {
//     public id!: number;
//     public productName!: string;
//     public category!: string;
//     public price!: number;
//     public description!: string;
//     public static associate(models: any) {
//         Products.belongsTo(models.Categorys, {
//             foreignKey: "category",
//             as: "category"
//         });
//     }
// }
// Products.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         productName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         category: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             references: {
//                 model: "Categorys",
//                 key: "cartegory",
//             },
//         },
//         price: {
//             type: DataTypes.FLOAT,
//             allowNull: false,
//         },
//         description: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//     },
//     {
//         sequelize,
//         modelName: "Product",
//         tableName: "products",
//         timestamps: true,
//     }
// );
// Products.associate = (models: any) => {
//     Products.belongsTo(models.Categorys, {
//         foreignKey: "category",
//         as: "category"
//     });
// };
