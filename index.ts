import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routers/auth.routes"
import productsRouter from "./routers/producte.routes"
import categorysRouter from "./routers/category.routes"
import logger from "./utils/logger"

const app =express()
app.use(cors({credentials:true,origin:"*"}))
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT || 3005
/// routers
app.use(authRouter)
app.use(productsRouter)
app.use(categorysRouter)


app.use((req, res, next) => {
  res.status(404).json({
    message: "Bunday endpoint mavjud emas!",
  });
});

app.listen(PORT, () =>{
    console.log("Server ishladi  " + PORT);
    logger.info(`Server ${PORT} da ishladi`)
    
})






















