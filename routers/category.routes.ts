import { RequestHandler, Router } from "express";
import { createCategory, deleteCategory, getAllCategorys, getOneCategory, searchCategory, updateCategory } from "../controller/categrys.ctr";
import { validateCategory } from "../middleware/categorys.middleware";
import { chekAdmin,chekSuperadmin} from "../middleware/chekAdmin";
const categorysRouter = Router()

categorysRouter.get("/get_categorys",getAllCategorys as RequestHandler)
categorysRouter.get("/get_one_category/:id",getOneCategory as RequestHandler)
categorysRouter.get("/search_category",searchCategory as RequestHandler)
categorysRouter.post("/create_categorys",chekSuperadmin as RequestHandler,chekAdmin as RequestHandler,validateCategory as RequestHandler,createCategory as RequestHandler)
categorysRouter.put("/update_category/:id",chekSuperadmin as RequestHandler,chekAdmin as RequestHandler,updateCategory as RequestHandler)
categorysRouter.delete("/delete_category/:id",chekSuperadmin as RequestHandler,chekAdmin as RequestHandler,deleteCategory as RequestHandler)
export default categorysRouter
