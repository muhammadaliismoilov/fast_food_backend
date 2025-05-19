import { RequestHandler, Router } from "express";
import { validateAdmin } from "../middleware/auth.middleware";
import { createAdmin, deleteAdmin, getAllAdmins, getOneAdmin, login, logout, updateAdmin } from "../controller/auth.ctr";
import { chekAdmin, chekSuperadmin } from "../middleware/chekAdmin";
const authRouter = Router()

authRouter.post("/login",login as RequestHandler)
authRouter.post("/logout",logout as RequestHandler)

authRouter.get("/get_admins",getAllAdmins as RequestHandler)
authRouter.get("/get_one_admin/:id",getOneAdmin as RequestHandler)
authRouter.post("/create_admin",validateAdmin,createAdmin as RequestHandler)
authRouter.put("/update_admin/:id",chekSuperadmin as RequestHandler, updateAdmin as RequestHandler)
authRouter.delete("/delete_admin/:id",chekSuperadmin as RequestHandler,deleteAdmin as RequestHandler)

export default authRouter