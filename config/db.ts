import { Sequelize } from "sequelize";
import dotenv from "dotenv"
import { Categorys } from "../Model/categorys.models";
import { Products } from "../Model/prodacts.model";
dotenv.config()

const sequelize = new Sequelize({
    host:"localhost",
    port:Number(process.env.DB_PORT) || 5432,
    username:"postgres",
    database:process.env.DATABASE_NAME as string,
    password:process.env.DB_PASSWORD as string,
    dialect:"postgres",
    logging:false
})
sequelize.authenticate().then(() => {
    console.log("Databazaga muvaffaqiyatli ulandi");  
}).catch((error) => console.log(error.message))
 sequelize.sync({ force: false });
    console.log("Jadval sinxronlashtirildi!");
export default sequelize


