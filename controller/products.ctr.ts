import {Request,Response, NextFunction } from "express";
import { Products } from "../Model/prodacts.model";
import { ICreateProduct } from "../dto/create_product_dt";
import { Categorys } from "../Model/categorys.models";
import { IUpdateProduct } from "../dto/update_product_dto";
import { Op } from "sequelize";

export const getAllProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const product = await Products.findAll()
        res.status(200).json(product)
    } catch (error:any) {
        next(error)
    }
}

export const getOneProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const product = await Products.findByPk(+req.params.id as number)
    if (!product) res.status(404).json({mesage:"Mahsulot topilmadi"})
        res.status(200).json(product)
    } catch (error:any) {
        next(error)
    }
}

export const searchProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const searchTerm = req.query.productName as string; 
        if (!searchTerm) {
            return res.status(400).json({ message: "Qidiruv so'zi kiritilmagan" });
        }
        const products = await Products.findAll({
            where: {
                productName: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Mahsulot topilmadi" });
        }

        res.status(200).json(products);

    } catch (error:any) {
        next(error)
    }
}


export const createProduct = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const categorya = await Categorys.findOne({where:{category: req.body.category }});
        if (!categorya) {
            return res.status(400).json({ message: "Bu kategoriya bazada mavjud emas!" });
        }
        const category = await Products.create(req.body) as ICreateProduct
        res.status(200).json(category);
    } catch (error: any) {
        next(error);
    }
}
export const updateProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const {productName,category,price,description} = req.body as IUpdateProduct
    const product = await Products.findByPk(+req.params.id as number)
    if (!product) res.status(404).json({mesage:"Mahsulot topilmadi"})
        product?.update({productName,category,price,description})
        res.status(200).json({message:"Malumotlar yangilandi"})
    } catch (error:any) {
        next(error)
    }
}
export const deleteProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const product = await Products.findByPk(+req.params.id as number)
    if (!product) res.status(404).json({mesage:"Mahsulot topilmadi"})
       await Products.destroy({where :{id:+req.params.id}})
        res.status(200).json({message:"Malumotlar yangilandi"})
    } catch (error:any) {
        next(error)
    }
}


