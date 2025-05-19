"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.searchProduct = exports.getOneProduct = exports.getAllProduct = void 0;
const prodacts_model_1 = require("../Model/prodacts.model");
const categorys_models_1 = require("../Model/categorys.models");
const sequelize_1 = require("sequelize");
const getAllProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prodacts_model_1.Products.findAll();
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProduct = getAllProduct;
const getOneProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prodacts_model_1.Products.findByPk(+req.params.id);
        if (!product)
            res.status(404).json({ mesage: "Mahsulot topilmadi" });
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getOneProduct = getOneProduct;
const searchProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.productName;
        if (!searchTerm) {
            return res.status(400).json({ message: "Qidiruv so'zi kiritilmagan" });
        }
        const products = yield prodacts_model_1.Products.findAll({
            where: {
                productName: {
                    [sequelize_1.Op.like]: `%${searchTerm}%`
                }
            }
        });
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Mahsulot topilmadi" });
        }
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.searchProduct = searchProduct;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorya = yield categorys_models_1.Categorys.findOne({ where: { category: req.body.category } });
        if (!categorya) {
            return res.status(400).json({ message: "Bu kategoriya bazada mavjud emas!" });
        }
        const category = yield prodacts_model_1.Products.create(req.body);
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, category, price, description } = req.body;
        const product = yield prodacts_model_1.Products.findByPk(+req.params.id);
        if (!product)
            res.status(404).json({ mesage: "Mahsulot topilmadi" });
        product === null || product === void 0 ? void 0 : product.update({ productName, category, price, description });
        res.status(200).json({ message: "Malumotlar yangilandi" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prodacts_model_1.Products.findByPk(+req.params.id);
        if (!product)
            res.status(404).json({ mesage: "Mahsulot topilmadi" });
        yield prodacts_model_1.Products.destroy({ where: { id: +req.params.id } });
        res.status(200).json({ message: "Malumotlar yangilandi" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
