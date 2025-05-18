import { RequestHandler, Router } from "express";
import { createCategory, deleteCategory, getAllCategorys, getOneCategory, searchCategory, updateCategory } from "../controller/categrys.ctr";
const categorysRouter = Router()

categorysRouter.get("/get_categorys",getAllCategorys as RequestHandler)
categorysRouter.get("/get_one_category/:id",getOneCategory as RequestHandler)
categorysRouter.get("/search_category",searchCategory as RequestHandler)
categorysRouter.post("/create_categorys",createCategory as RequestHandler)
categorysRouter.put("/update_category/:id",updateCategory as RequestHandler)
categorysRouter.delete("/delete_category/:id",deleteCategory as RequestHandler)
export default categorysRouter
