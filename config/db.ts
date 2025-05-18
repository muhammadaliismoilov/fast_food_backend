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


// const sequelizes = new Sequelize("sqlite::memory:"); // Sizning DB sozlamangizni kiriting

// const models = {
//     Categorys,
//     Products,
// };

// Object.values(models).forEach((model: any) => {
//     if (model.associate) {
//         model.associate(models);
//     }
// });

// export { sequelizes, Categorys, Products };

// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// import { Categorys } from "../Model/categorys.models"; 
// import { Products } from "../Model/prodacts.model";

// dotenv.config();

// // PostgreSQL uchun Sequelize instansi
// const sequelize = new Sequelize({
//     host: "localhost",
//     port: Number(process.env.DB_PORT) || 5432,
//     username: "postgres",
//     database: process.env.DATABASE_NAME as string,
//     password: process.env.DB_PASSWORD as string,
//     dialect: "postgres",
//     logging: false,
// });

// // Autentifikatsiya va sinxronizatsiya
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Databazaga muvaffaqiyatli ulandi");
//         return sequelize.sync({ force: false });
//     })
//     .then(() => {
//         console.log("Jadval sinxronlashtirildi!");
//     })
//     .catch((error) => {
//         console.error("Xato yuz berdi:", error.message);
//     });

// // Modellarni birlashtirish
// const models = {
//     Categorys,
//     Products,
// };

// // Aloqalarni sozlash
// Object.values(models).forEach((model: any) => {
//     if (model.associate) {
//         model.associate(models);
//     }
// });

// // Faqat bitta instansni eksport qilish
// export { sequelize, Categorys, Products };
