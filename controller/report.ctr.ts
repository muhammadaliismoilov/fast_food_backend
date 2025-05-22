import {Request,Response, NextFunction } from "express";
import { Reports } from "../Model/reports.model";
import { ICreateReports } from "../dto/create_report_dto";
import { ICUpdateReports } from "../dto/update_report_dto";
import { Products } from "../Model/products.model";
import { Users } from "../Model/users.model";
import { Branches } from "../Model/branches.model";
import { Op } from "sequelize";
import BaseError from "../utils/base.error";


export const getAllReports = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const foundAll = await Reports.findAll()
        res.status(200).json(foundAll)
    } catch (error:any) {
        next(error)
    }
}

export const getOneReports = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const product = await Reports.findByPk(+req.params.id as number)
    if (!product) throw BaseError.BadRequest(404, "Xisbot topilmadi");
        res.status(200).json(product)
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const searchReports = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const searchTerm = req.query.brancheName as string; 
        if (!searchTerm) {
            throw BaseError.BadRequest(400, "Qidiruv so'zi kiritilmagan");
        }
        const products = await Reports.findAll({
            where: {
                brancheName: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });

        if (!products || products.length === 0) {
            throw BaseError.BadRequest(404, "Xisobot topilmadi");
        }
        res.status(200).json(products);
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const createReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundedBranche = await Branches.findOne({where:{brancheName: req.body.brancheName }});
        if (!foundedBranche) throw BaseError.Unauthorized(400,"Bu filial bazada mavjud emas!")    
        const foundedProduct = await Products.findOne({where:{price: req.body.orderQuantity }});
        if (!foundedProduct) throw BaseError.Unauthorized(400,"Bu narx bazada mavjud emas!!")       
        const foundedUser = await Users.findOne({where:{fullName: req.body.client }});
        if (!foundedUser)  throw BaseError.Unauthorized(400,"Bu foydalanuvchi bazada mavjud emas!")
        const newRepoet = {
            brancheName: foundedBranche.brancheName,
            orderQuantity :foundedProduct.price,
            client: foundedUser.fullName
        }
        await Reports.create(newRepoet) as ICreateReports;
        res.status(200).json({message:"Xisobot qo`shildi",newRepoet});
    } catch (error: any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));;
    }
};

export const updateReports = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const {brancheName,orderQuantity,client} = req.body as ICUpdateReports
    const report = await Products.findByPk(+req.params.id as number)
    if (!report) throw BaseError.BadRequest(404, "Mahsulot topilmadi");
        report?.update({brancheName,orderQuantity,client})
        res.status(200).json({message:"Malumotlar yangilandi"})
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}
export const deleteReports = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const product = await Reports.findByPk(+req.params.id as number)
    if (!product) throw BaseError.BadRequest(404, "Xisobot topilmadi");
       await Reports.destroy({where :{id:+req.params.id}})
        res.status(200).json({message:"Malumotlar yangilandi"})
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}
