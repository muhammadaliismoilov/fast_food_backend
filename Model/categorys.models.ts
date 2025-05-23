import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Order } from "./orders.model";

export class Categorys extends Model {
    public id!: number;
    public category!: string;
}

Categorys.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Category",
        tableName: "categorys",
        timestamps: true,
    }
);
Order.hasMany(Categorys, {
    foreignKey: 'categoryId', // Products jadvalidagi category maydoni
    as: 'orderCategory', // Assotsiatsiya nomi
});
Categorys.belongsTo(Order, {
    foreignKey: 'categoryId', // Products jadvalidagi category maydoni
    as: 'categorye', // Assotsiatsiya nomi
});
