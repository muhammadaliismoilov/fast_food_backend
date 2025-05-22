import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

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
