import {Request,Response, NextFunction } from "express";
import { Categorys } from "../Model/categorys.models";
import { Products } from "../Model/prodacts.model";
import { ICreateCategory } from "../dto/create_category_dto";
import { IUpdateCategory } from "../dto/update_category_dto";
import { Op } from "sequelize";
import sequelize from "sequelize";

export const getAllCategorys = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const categorys = await Categorys.findAll()
        res.status(200).json(categorys)
    } catch (error:any) {
        next(error)
    }
}

export const getOneCategory = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const category = await Categorys.findByPk(+req.params.id as number)
    if (!category) res.status(404).json({mesage:"Categorya topilmadi"})
        res.status(200).json(category)
    } catch (error:any) {
        next(error)
    }
}
export const searchCategory = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const searchTerm = req.query.category as string; 
        if (!searchTerm) {
            return res.status(400).json({ message: "Qidiruv so'zi kiritilmagan" });
        }
        const category = await Categorys.findAll({
            where: {
                category: {
                    [Op.like]: `%${searchTerm}%`
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
    } catch (error:any) {
        next(error)
    }
}
// expor

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingCategory = await Categorys.findOne({where:{category: req.body.category }});
        if (existingCategory) {
            return res.status(400).json({ message: "Bu kategoriya bazada mavjud" });
        }
        const category = await Categorys.create(req.body) as ICreateCategory;
        res.status(200).json(category);
    } catch (error: any) {
        next(error);
    }
};

export const updateCategory = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const {category} = req.body as IUpdateCategory
    const categoryId = await Categorys.findByPk(+req.params.id as number)
    if (!categoryId) res.status(404).json({mesage:"Categorya topilmadi"})
        categoryId?.update({category})
        res.status(200).json({message:"Ma`lumot yangilandi"})
    } catch (error:any) {
        next(error)
    }
}

export const deleteCategory = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const categoryId = await Categorys.findByPk(+req.params.id as number)
    if (!categoryId) res.status(404).json({mesage:"Categorya topilmadi"})
        await Categorys.destroy({where :{id:+req.params.id}})
        await Products.destroy({where:{category:categoryId?.category}})
        res.status(200).json({message:"Ma`lumot o`chirildi"})
    } catch (error:any) {
        next(error)
    }
}