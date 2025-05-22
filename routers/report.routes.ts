import { RequestHandler, Router } from "express";

import { validateReports } from "../middleware/report.middleware";
import { chekAdmin,chekSuperadmin} from "../middleware/chekAdmin";
import { createReport, getAllReports } from "../controller/report.ctr";

const reportsRouter = Router()

reportsRouter.get("/get_reports",getAllReports as RequestHandler)
// reportsRouter.get("/get_one_report/:id",getOneReport as RequestHandler)
// reportsRouter.get("/search_report",searchReport as RequestHandler)
reportsRouter.post("/create_report",validateReports as RequestHandler,createReport as RequestHandler)
// reportsRouter.put("/update_report/:id",chekAdmin as RequestHandler,updateReport as RequestHandler)
// reportsRouter.delete("/delete_report/:id",chekAdmin as RequestHandler,deleteReport as RequestHandler)


export default reportsRouter


