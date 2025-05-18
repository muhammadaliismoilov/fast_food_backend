import { RequestHandler, Router } from "express";
import { createProduct, deleteProduct, getAllProduct, getOneProduct, searchProduct, updateProduct } from "../controller/products.ctr";
import { validateProduct } from "../middleware/products.middleware";

const productsRouter = Router()

productsRouter.get("/get_products",getAllProduct as RequestHandler)
productsRouter.get("/get_one_product/:id",getOneProduct as RequestHandler)
productsRouter.get("/search_product",searchProduct as RequestHandler)
productsRouter.post("/create_product",validateProduct as RequestHandler,createProduct as RequestHandler)
productsRouter.put("/update_product/:id",updateProduct as RequestHandler)
productsRouter.delete("/delete_product/:id",deleteProduct as RequestHandler)


export default productsRouter








