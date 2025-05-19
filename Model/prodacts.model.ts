import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Products extends Model {
    public id!: number;
    public productName!: string;
    // public productImg !: string;
    public category!: string;
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
        category: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName:"products",
        timestamps:true
    }
);

















