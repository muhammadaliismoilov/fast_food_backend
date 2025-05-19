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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.searchCategory = exports.getOneCategory = exports.getAllCategorys = void 0;
const categorys_models_1 = require("../Model/categorys.models");
const prodacts_model_1 = require("../Model/prodacts.model");
const sequelize_1 = require("sequelize");
const getAllCategorys = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorys = yield categorys_models_1.Categorys.findAll();
        res.status(200).json(categorys);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCategorys = getAllCategorys;
const getOneCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categorys_models_1.Categorys.findByPk(+req.params.id);
        if (!category)
            res.status(404).json({ mesage: "Categorya topilmadi" });
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getOneCategory = getOneCategory;
const searchCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.category;
        if (!searchTerm) {
            return res.status(400).json({ message: "Qidiruv so'zi kiritilmagan" });
        }
        const category = yield categorys_models_1.Categorys.findAll({
            where: {
                category: {
                    [sequelize_1.Op.like]: `%${searchTerm}%`
                }
            }
            // ,
            // include: [
            //     {
            //         model: Products,
            //         as: "products", // Aloqada ko'rsatilgan alias
            //         where: {
            //             category: {
            //                 [Op.like]: `%${searchTerm}%` // Mahsulotning category maydoni bilan moslashtirish
            //             }
            //         }
            //     }
            // ]
        });
        if (!category || category.length === 0) {
            return res.status(404).json({ message: "Mahsulot topilmadi" });
        }
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.searchCategory = searchCategory;
// expor
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCategory = yield categorys_models_1.Categorys.findOne({ where: { category: req.body.category } });
        if (existingCategory) {
            return res.status(400).json({ message: "Bu kategoriya bazada mavjud" });
        }
        const category = yield categorys_models_1.Categorys.create(req.body);
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        const categoryId = yield categorys_models_1.Categorys.findByPk(+req.params.id);
        if (!categoryId)
            res.status(404).json({ mesage: "Categorya topilmadi" });
        categoryId === null || categoryId === void 0 ? void 0 : categoryId.update({ category });
        res.status(200).json({ message: "Ma`lumot yangilandi" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = yield categorys_models_1.Categorys.findByPk(+req.params.id);
        if (!categoryId)
            res.status(404).json({ mesage: "Categorya topilmadi" });
        yield categorys_models_1.Categorys.destroy({ where: { id: +req.params.id } });
        yield prodacts_model_1.Products.destroy({ where: { category: categoryId === null || categoryId === void 0 ? void 0 : categoryId.category } });
        res.status(200).json({ message: "Ma`lumot o`chirildi" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;
