import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

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
    tableName: "Users",
    timestamps: true
})