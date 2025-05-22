import {Request,Response, NextFunction } from "express";
import { Products } from "../Model/products.model";
import { ICreateProduct } from "../dto/create_product_dt";
import { Categorys } from "../Model/categorys.models";
import { IUpdateProduct } from "../dto/update_product_dto";
import { Op } from "sequelize";
import BaseError from "../utils/base.error";

export const getAllProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const product = await Products.findAll()
        res.status(200).json(product)
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const getOneProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const product = await Products.findByPk(+req.params.id as number)
    if (!product) throw BaseError.BadRequest(404, "Mahsulot topilmadi");
        res.status(200).json(product)
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const searchProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const searchTerm = req.query.productName as string; 
        if (!searchTerm) {
            throw BaseError.BadRequest(400, "Qidiruv so'zi kiritilmagan");
        }
        const products = await Products.findAll({
            where: {
                productName: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });

        if (!products || products.length === 0) {
            throw BaseError.BadRequest(404, "Mahsulot topilmadi");
        }

        res.status(200).json(products);

    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}


export const createProduct = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const found = await Categorys.findOne({where:{id: req.body.categoryId }});
        if (!found) {
           throw BaseError.BadRequest(400, "Categorya bazada mavjud emas!");
        }
        const product = await Products.create(req.body) as ICreateProduct
        res.status(200).json({message:"Yangi mahsulot qo`shildi",product});
    } catch (error: any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));;
    }
}

export const updateProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const {productName,/*productImg,*/categoryId,price,description} = req.body as IUpdateProduct
    const product = await Products.findByPk(+req.params.id as number)
    if (!product) throw BaseError.BadRequest(404, "Mahsulot topilmadi");
        product?.update({productName,/*productImg,*/categoryId,price,description})
        res.status(200).json({message:"Malumotlar yangilandi"})
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}
export const deleteProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const product = await Products.findByPk(+req.params.id as number)
    if (!product) throw BaseError.BadRequest(404, "Mahsulot topilmadi");
       await Products.destroy({where :{id:+req.params.id}})
        res.status(200).json({message:"Malumotlar yangilandi"})
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}


