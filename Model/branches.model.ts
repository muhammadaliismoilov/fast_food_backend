import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'
import { Order } from './orders.model'

export class Branches extends Model {
    public id!: number
    public brancheName!: string
    public brancheAround!: string
    public workingTime!: string
    public location!: string
}

Branches.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brancheName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brancheAround: {
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
Order.hasMany(Branches, {
    foreignKey: 'breancheId', // Products jadvalidagi category maydoni
    as: 'orderBranche', // Assotsiatsiya nomi
});
Branches.belongsTo(Order, {
    foreignKey: 'breancheId', // Products jadvalidagi category maydoni
    as: 'branche', // Assotsiatsiya nomi
});