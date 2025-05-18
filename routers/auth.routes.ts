import { RequestHandler, Router } from "express";
import { validateAdmin } from "../middleware/auth.middleware";
import { createAdmin, deleteAdmin, getAllAdmins, getOneAdmin, updateAdmin } from "../controller/auth.ctr";
const authRouter = Router()

authRouter.get("/get_admins",getAllAdmins as RequestHandler)
authRouter.get("/get_one_admin/:id",getOneAdmin as RequestHandler)
authRouter.post("/create_admin",validateAdmin,createAdmin as RequestHandler)
authRouter.put("/update_admin/:id", updateAdmin as RequestHandler)
authRouter.delete("/delete_admin/:id",deleteAdmin as RequestHandler)

export default authRouter