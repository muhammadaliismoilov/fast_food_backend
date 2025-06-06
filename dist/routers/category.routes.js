"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categrys_ctr_1 = require("../controller/categrys.ctr");
const categorys_middleware_1 = require("../middleware/categorys.middleware");
const chekAdmin_1 = require("../middleware/chekAdmin");
const categorysRouter = (0, express_1.Router)();
categorysRouter.get("/get_categorys", categrys_ctr_1.getAllCategorys);
categorysRouter.get("/get_one_category/:id", categrys_ctr_1.getOneCategory);
categorysRouter.get("/search_category", categrys_ctr_1.searchCategory);
categorysRouter.post("/create_categorys", chekAdmin_1.chekAdmin, categorys_middleware_1.validateCategory, categrys_ctr_1.createCategory);
categorysRouter.put("/update_category/:id", chekAdmin_1.chekAdmin, categrys_ctr_1.updateCategory);
categorysRouter.delete("/delete_category/:id", chekAdmin_1.chekAdmin, categrys_ctr_1.deleteCategory);
exports.default = categorysRouter;
