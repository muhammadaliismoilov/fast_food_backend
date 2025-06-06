"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const auth_ctr_1 = require("../controller/auth.ctr");
const chekAdmin_1 = require("../middleware/chekAdmin");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", auth_ctr_1.login);
authRouter.post("/logout", auth_ctr_1.logout);
authRouter.get("/get_admins", chekAdmin_1.chekAdmin, auth_ctr_1.getAllAdmins);
authRouter.get("/get_one_admin/:id", auth_ctr_1.getOneAdmin);
authRouter.post("/create_admin", chekAdmin_1.chekSuperadmin, auth_middleware_1.validateAdmin, auth_ctr_1.createAdmin);
authRouter.put("/update_admin/:id", auth_ctr_1.updateAdmin);
authRouter.delete("/delete_admin/:id", auth_ctr_1.deleteAdmin);
exports.default = authRouter;
