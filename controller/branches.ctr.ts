import {Request,Response, NextFunction } from "express";
import { Branches } from "../Model/branches.model";
import { ICreateBranches } from "../dto/create_branche_dto";
import { IUpdateBranches } from "../dto/update_branche_dto";
import { Op } from "sequelize";
import BaseError from "../utils/base.error";

export const getAllBranches = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const foundAll = await Branches.findAll()
        res.status(200).json(foundAll)
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const getOneBranche = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const foundOne = await Branches.findByPk(+req.params.id as number)
    if (!foundOne) throw BaseError.Unauthorized(404, 'Filial topilmadi');
        res.status(200).json(foundOne)
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const searchBranche = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const searchTerm = req.query.brancheName as string; 
        if (!searchTerm) {
            throw BaseError.BadRequest(400, "Qidiruv so'zi kiritilmagan");
        }
        const filial = await Branches.findAll({
            where: {
                brancheName: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });
        if (!filial || filial.length === 0) {
            throw BaseError.Unauthorized(404, 'Filial topilmadi');
        }
        res.status(200).json(filial);
    } catch (error:any) {
       next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const createBranche = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const founded = await Branches.findOne({where:{brancheName: req.body.brancheName }});
        if (founded) {
            throw BaseError.BadRequest(400, 'Filial bazada mavjud');
        }
        const createBranche = await Branches.create(req.body) as ICreateBranches;
        res.status(200).json({message:"Yangi filial qo`shildi",createBranche});
    } catch (error: any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
};

export const updateBranche= async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const {brancheName,brancheAround,workingTime,location} = req.body as IUpdateBranches
    const brancheId = await Branches.findByPk(+req.params.id as number)
    if (!brancheId) throw BaseError.Unauthorized(404, 'Filial topilmadi');
        brancheId?.update({brancheName,brancheAround,workingTime,location})
        res.status(200).json({message:"Filial ma`lumotlari yangilandi"})
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const deleteBranche = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const brancheId = await Branches.findByPk(+req.params.id as number)
    if (!brancheId) throw BaseError.Unauthorized(404, 'Filial topilmadi');
        await Branches.destroy({where :{id:+req.params.id}})
        res.status(200).json({message:"Filial ma`lumotlari o`chirildi"})
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}