import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routers/auth.routes"
import productsRouter from "./routers/producte.routes"
import categorysRouter from "./routers/category.routes"
import brancheRouter from "./routers/branche.routes"
import userRouter from "./routers/user.routes"
import reportsRouter from "./routers/report.routes"
import errorMiddleware from "./middleware/error.middleware"
import logger from "./utils/logger"
import { SwaggerUiOptions } from "swagger-ui-express"
import ordersRouter from "./routers/order.routes"
import swaggerSpec from "./utils/swagger"
import SwaggerUIExpress from "swagger-ui-express"

const app = express()
app.use(cors({credentials:true,origin:"*"}))
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT || 3005
/// routers
app.use(authRouter)
app.use(productsRouter)
app.use(categorysRouter)
app.use(brancheRouter)
app.use(userRouter)
app.use(reportsRouter)
app.use(ordersRouter)
app.use(`/api-docs`,SwaggerUIExpress.serve,SwaggerUIExpress.setup(swaggerSpec))


app.use(errorMiddleware)
app.use((req, res, next) => {
  res.status(404).json({
    message: "Bunday endpoint mavjud emas!",
  });
});

app.listen(PORT, () =>{
    console.log("Server ishladi  " + PORT);
    logger.info(`Server ${PORT} da ishladi`)
})






















