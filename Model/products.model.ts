import { Model, DataTypes } from "sequelize";
import { Categorys } from "./categorys.models";
import { Order } from "./orders.model";
import sequelize from "../config/db";

export class Products extends Model {
    public id!: number;
    public productName!: string;
    // public productImg!: string;
    public categoryId!: number; // category maydoni INTEGER sifatida
    public price!: number;
    public description!: string;
}

Products.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // productImg: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        categoryId: {
            type: DataTypes.INTEGER, // STRING o‘rniga INTEGER, chunki foreignKey
            allowNull: false,
            references: {
                model: 'categorys', // Categorys jadvaliga ishora, to‘g‘ri tableName ga moslashtirildi
                key: 'id',
            },
            onDelete: 'CASCADE', // Kategoriya o‘chirilsa, bog‘liq mahsulotlar ham o‘chiriladi
            onUpdate: 'CASCADE', // Kategoriya ID yangilansa, mahsulotlar ham yangilanadi
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Product",
        tableName: "products",
        timestamps: true,
    }
);
//category foregin key
Categorys.hasMany(Products, {
    foreignKey: 'categoryId', // Products jadvalidagi category maydoni
    as: 'products', // Assotsiatsiya nomi
});
Products.belongsTo(Categorys, {
    foreignKey: 'categoryId', // Products jadvalidagi category maydoni
    as: 'category', // Assotsiatsiya nomi
});
//order foregin key
Order.hasMany(Products, {
    foreignKey: 'productId', // Products jadvalidagi category maydoni
    as: 'orderProduct', // Assotsiatsiya nomi
});
Products.belongsTo(Order, {
    foreignKey: 'productId', // Products jadvalidagi category maydoni
    as: 'products', // Assotsiatsiya nomi
});















