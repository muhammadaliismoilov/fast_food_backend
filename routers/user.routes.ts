import { RequestHandler, Router } from "express";
import { validateUser } from "../middleware/users.middleware";
import { chekAdmin,chekSuperadmin} from "../middleware/chekAdmin";
import { createUser, deleteUser, getAllUsers, getOneUser, searchUser, updateUser } from "../controller/user.cts";

const userRouter = Router()

userRouter.get("/get_users",getAllUsers as RequestHandler)
userRouter.get("/get_one_user/:id",getOneUser as RequestHandler)
userRouter.get("/search_user",searchUser as RequestHandler)
userRouter.post("/create_user",validateUser as RequestHandler,createUser as RequestHandler)
userRouter.put("/update_user/:id",updateUser as RequestHandler)
userRouter.delete("/delete_user/:id",deleteUser as RequestHandler)

export default userRouter