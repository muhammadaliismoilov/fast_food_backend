import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Products extends Model {
    public id!: number;
    public productName!: string;
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















