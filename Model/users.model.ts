import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'
import { Order } from './orders.model'

export class Users extends Model {
    public id!: number
    public fullName!: string
    public phoneNumber!: string
    public orderCount!: number
    public blocked! : boolean
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orderCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0    
    },
    blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false 
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true
})
Order.hasMany(Users, {
    foreignKey: 'userId', // Products jadvalidagi category maydoni
    as: 'orderUser', // Assotsiatsiya nomi
});
Users.belongsTo(Order, {
    foreignKey: 'userId', // Products jadvalidagi category maydoni
    as: 'Users', // Assotsiatsiya nomi
});