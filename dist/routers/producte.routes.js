"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_ctr_1 = require("../controller/products.ctr");
const products_middleware_1 = require("../middleware/products.middleware");
const chekAdmin_1 = require("../middleware/chekAdmin");
const productsRouter = (0, express_1.Router)();
productsRouter.get("/get_products", products_ctr_1.getAllProduct);
productsRouter.get("/get_one_product/:id", products_ctr_1.getOneProduct);
productsRouter.get("/search_product", products_ctr_1.searchProduct);
productsRouter.post("/create_product", chekAdmin_1.chekAdmin, products_middleware_1.validateProduct, products_ctr_1.createProduct);
productsRouter.put("/update_product/:id", chekAdmin_1.chekAdmin, products_ctr_1.updateProduct);
productsRouter.delete("/delete_product/:id", chekAdmin_1.chekAdmin, products_ctr_1.deleteProduct);
exports.default = productsRouter;
