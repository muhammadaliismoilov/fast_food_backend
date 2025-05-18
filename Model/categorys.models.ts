import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Categorys extends Model {
    public id!:number
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
        tableName:"categorys",
        timestamps:true
    }
);

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

