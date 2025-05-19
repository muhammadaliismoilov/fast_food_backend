import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

export class Branches extends Model {
    public id!: number
    public breanchename!: string
    public breancheAround!: string
    public workingTime!: string
    public location!: string
}

Branches.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    breanchename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    breancheAround: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    workingTime: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false  
    }
}, {
    sequelize,
    modelName: "Branch",
    tableName: "branches",
    timestamps: true
})