import {Request,Response, NextFunction } from "express";
import { Categorys } from "../Model/categorys.models";
import { Products } from "../Model/products.model"
import { ICreateCategory } from "../dto/create_category_dto";
import { IUpdateCategory } from "../dto/update_category_dto";
import { Op } from "sequelize";
import BaseError from "../utils/base.error";

export const getAllCategorys = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const categorys = await Categorys.findAll()
        res.status(200).json(categorys)
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const getOneCategory = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const category = await Categorys.findByPk(+req.params.id , {
      include: [
        {
          model: Products,
          as: "products", 
        },
      ],
    });
    res.status(200).json(category);
  } catch (error: any) {
    next(error instanceof BaseError ? error :BaseError.BadRequest(500, "Ichki server xatosi"));
  }
}

export const searchCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const searchTerm = req.query.category as string;
        if (!searchTerm) {
            throw BaseError.BadRequest(400, 'Qidiruv so\'zi kiritilmagan');
        }
        const categories = await Categorys.findAll({
            where: {
                category: {
                    [Op.like]: `%${searchTerm}%`,
                },
            },
            include: [{ model: Products, as: 'products' }],
        });
        if (!categories || categories.length === 0) {
            throw BaseError.BadRequest(404, 'Kategoriya topilmadi');
        }
        res.status(200).json(categories);
    } catch (error: any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));      
    }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingCategory = await Categorys.findOne({where:{category: req.body.category }});
        if (existingCategory) {
            throw BaseError.Unauthorized(400,"Bu kategoriya bazada mavjud")
        }
        const category = await Categorys.create(req.body) as ICreateCategory;
        res.status(200).json({message:"Yangi categorya qo`shildi",category});
    } catch (error: any) {
         next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));;
    }
};

export const updateCategory = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const {category} = req.body as IUpdateCategory
    const categoryId = await Categorys.findByPk(+req.params.id as number)
    if (!categoryId) throw BaseError.Unauthorized(404, 'Categorya topilmadi');
        categoryId?.update({category})
        res.status(200).json({message:"Ma`lumot yangilandi"})
    } catch (error:any) {
         next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const deleteCategory = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const categoryId = await Categorys.findByPk(+req.params.id as number)
    if (!categoryId) throw BaseError.Unauthorized(404, 'Categorya topilmadi');
        await Categorys.destroy({where :{id:+req.params.id}})
        await Products.destroy({where:{category:categoryId?.category}})
        res.status(200).json({message:"Ma`lumot o`chirildi"})
    } catch (error:any) {
         next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}