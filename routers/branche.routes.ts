import { RequestHandler, Router } from "express";
import { validateBranche } from "../middleware/branche.middleware";
import { createBranche, deleteBranche, getAllBranches, getOneBranche, searchBranche, updateBranche } from "../controller/branches.ctr";
import { chekAdmin, chekSuperadmin } from "../middleware/chekAdmin";

const brancheRouter = Router()

brancheRouter.get("/get_branches",getAllBranches as RequestHandler)
brancheRouter.get("/get_one_branche",getOneBranche as RequestHandler)
brancheRouter.get("/search_branche",searchBranche as RequestHandler)
brancheRouter.post("/create_branche",chekSuperadmin as RequestHandler,chekAdmin as RequestHandler,validateBranche,createBranche as RequestHandler)
brancheRouter.put("/update_branche",chekSuperadmin as RequestHandler,chekAdmin as RequestHandler,updateBranche as RequestHandler)
brancheRouter.delete("/delete_branche",chekSuperadmin as RequestHandler,chekAdmin as RequestHandler,deleteBranche as RequestHandler)

export default brancheRouter