import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

export class Admins extends Model {
    public login!: string
    public password!: string
    public role!: "admin" | "superadmin"
    id: any
}

Admins.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    role: {
        type: DataTypes.ENUM("admin", "superadmin"),
    }
}, {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
    timestamps: true
})