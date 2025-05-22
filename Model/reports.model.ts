import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Reports extends Model {
   public id!: number;
    public brancheName!: string;
    public orderQuantity !: number;
    public client!: string;
    public date!: Date;
}
Reports.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        brancheName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderQuantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        client: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, 
       },
    },
    {
        sequelize,
        modelName: "Report",
        tableName:"reports",
        timestamps:true
    }
);
