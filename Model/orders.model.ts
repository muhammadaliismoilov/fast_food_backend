import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Order extends Model {
    public id!: number;
    public userId!: number;
    public productId!: number;
    public categoryId!: number;
    public brancheId!: number;
    public position?: "yangi" | "qabul qilingan" | "jo`natilgan" | "yopilgan"

}
Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', 
                key: 'id',
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
        },
         productId: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'products', 
                key: 'id',
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
        },
        categoryId: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'categorys', 
                key: 'id',
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
        },
         brancheId: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: "branches", 
                key: 'id',
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
        },
        position:{
            type: DataTypes.ENUM( "yangi" , "qabul qilingan" , "jo`natilgan" , "yopilgan"),
            defaultValue:"yangi",
        }

    },
    {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: true,
    }
);

// import { Model, DataTypes, BuildOptions } from 'sequelize';
// import sequelize from '../config/db';
// import { Users } from './users.model';
// import { Products } from './products.model';
// import { Categorys } from './categorys.models';
// import { Branches } from './branches.model';

// interface OrderAttributes {
//   id: string;
//   userId: string;
//   productId: string;
//   categoryId: string;
//   brancheId: string;
//   position?: 'yangi' | 'qabul qilingan' | 'jo`natilgan' | 'yopilgan';
// }

// interface OrderInstance extends Model<OrderAttributes>, OrderAttributes {
//   orderUser?: Users;
//   orderProduct?: Products;
//   orderCategory?: Categorys;
//   orderBranche?: Branches;
// }

// export class Order extends Model<OrderInstance, OrderAttributes> {}

// Order.init(
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     userId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: { model: 'users', key: 'id' },
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE',
//     },
//     productId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: { model: 'products', key: 'id' },
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE',
//     },
//     categoryId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: { model: 'categorys', key: 'id' },
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE',
//     },
//     brancheId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: { model: 'branches', key: 'id' },
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE',
//     },
//     position: {
//       type: DataTypes.ENUM('yangi', 'qabul qilingan', 'jo`natilgan', 'yopilgan'),
//       defaultValue: 'yangi',
//     },
//   },
//   {
//     sequelize,
//     modelName: 'Order',
//     tableName: 'orders',
//     timestamps: true,
//   }
// );

// // Assotsiatsiyalarni ta'riflash
// Order.belongsTo(Users, { foreignKey: 'userId', as: 'orderUser' });
// Order.belongsTo(Products, { foreignKey: 'productId', as: 'orderProduct' });
// Order.belongsTo(Categorys, { foreignKey: 'categoryId', as: 'orderCategory' });
// Order.belongsTo(Branches, { foreignKey: 'brancheId', as: 'orderBranche' });













