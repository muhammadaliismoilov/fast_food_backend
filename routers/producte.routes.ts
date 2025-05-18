import { RequestHandler, Router } from "express";
import { createProduct, deleteProduct, getAllProduct, getOneProduct, searchProduct, updateProduct } from "../controller/products.ctr";

const productsRouter = Router()

productsRouter.get("/get_products",getAllProduct as RequestHandler)
productsRouter.get("/get_one_product/:id",getOneProduct as RequestHandler)
productsRouter.get("/search_product",searchProduct as RequestHandler)
productsRouter.post("/create_product",createProduct as RequestHandler)
productsRouter.put("/update_product/:id",updateProduct as RequestHandler)
productsRouter.delete("/delete_product/:id",deleteProduct as RequestHandler)


export default productsRouter








