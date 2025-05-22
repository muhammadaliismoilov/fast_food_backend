import { RequestHandler, Router } from "express";
import { validateBranche } from "../middleware/branche.middleware";
import { createBranche, deleteBranche, getAllBranches, getOneBranche, searchBranche, updateBranche } from "../controller/branches.ctr";
import { chekAdmin} from "../middleware/chekAdmin";

const brancheRouter = Router()

/**
 * @swagger
 * /branches:
 *   get:
 *     summary: Barcha filiallar ro‘yxatini olish
 *     description: Tizimdagi barcha filiallar ro‘yxatini qaytaradi.
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: Filiallar ro‘yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: Filial ID
 *                     example: 1
 *                   brancheName:
 *                     type: string
 *                     description: Filial nomi
 *                     example: "Toshkent filiali"
 *                   brancheAround:
 *                     type: string
 *                     description: Filial atrofidagi joylashuv
 *                     example: "Chilonzor tumani"
 *                   workingTime:
 *                     type: string
 *                     description: Filial ish vaqti
 *                     example: "09:00-18:00"
 *                   location:
 *                     type: string
 *                     description: Filial manzili
 *                     example: "Toshkent sh., Chilonzor, 45-uy"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
brancheRouter.get("/get_branches",getAllBranches as RequestHandler)

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Bitta filialni olish
 *     description: Berilgan ID orqali ma'lum bir filial haqida ma'lumot qaytaradi.
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Filialning ID si
 *         example: 1
 *     responses:
 *       200:
 *         description: Filial muvaffaqiyatli topildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: Filial ID
 *                   example: 1
 *                 brancheName:
 *                   type: string
 *                   description: Filial nomi
 *                   example: "Toshkent filiali"
 *                 brancheAround:
 *                   type: string
 *                   description: Filial atrofidagi joylashuv
 *                   example: "Chilonzor tumani"
 *                 workingTime:
 *                   type: string
 *                   description: Filial ish vaqti
 *                   example: "09:00-18:00"
 *                 location:
 *                   type: string
 *                   description: Filial manzili
 *                   example: "Toshkent sh., Chilonzor, 45-uy"
 *       404:
 *         description: Filial topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Filial topilmadi"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
brancheRouter.get("/get_one_branche/:id",getOneBranche as RequestHandler)

/**
 * @swagger
 * /branches/search:
 *   get:
 *     summary: Filialni nomi bo‘yicha qidirish
 *     description: Filial nomiga ko‘ra qidiruv amalga oshiradi (qisman moslik).
 *     tags: [Branches]
 *     parameters:
 *       - in: query
 *         name: brancheName
 *         required: true
 *         schema:
 *           type: string
 *         description: Qidiriladigan filial nomi
 *         example: "Toshkent"
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: Filial ID
 *                     example: 1
 *                   brancheName:
 *                     type: string
 *                     description: Filial nomi
 *                     example: "Toshkent filiali"
 *                   brancheAround:
 *                     type: string
 *                     description: Filial atrofidagi joylashuv
 *                     example: "Chilonzor tumani"
 *                   workingTime:
 *                     type: string
 *                     description: Filial ish vaqti
 *                     example: "09:00-18:00"
 *                   location:
 *                     type: string
 *                     description: Filial manzili
 *                     example: "Toshkent sh., Chilonzor, 45-uy"
 *       400:
 *         description: Qidiruv so‘zi kiritilmagan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Qidiruv so'zi kiritilmagan"
 *       404:
 *         description: Filial topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Filial topilmadi"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
brancheRouter.get("/search_branche",searchBranche as RequestHandler)

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Yangi filial qo‘shish
 *     description: Yangi filial yaratadi, agar filial nomi allaqachon mavjud bo‘lsa xato qaytaradi.
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brancheName
 *             properties:
 *               brancheName:
 *                 type: string
 *                 description: Filial nomi
 *                 example: "Toshkent filiali"
 *               brancheAround:
 *                 type: string
 *                 description: Filial atrofidagi joylashuv
 *                 example: "Chilonzor tumani"
 *               workingTime:
 *                 type: string
 *                 description: Filial ish vaqti
 *                 example: "09:00-18:00"
 *               location:
 *                 type: string
 *                 description: Filial manzili
 *                 example: "Toshkent sh., Chilonzor, 45-uy"
 *     responses:
 *       200:
 *         description: Filial muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Yangi filial qo‘shildi"
 *                 createBranche:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Filial ID
 *                       example: 1
 *                     brancheName:
 *                       type: string
 *                       description: Filial nomi
 *                       example: "Toshkent filiali"
 *                     brancheAround:
 *                       type: string
 *                       description: Filial atrofidagi joylashuv
 *                       example: "Chilonzor tumani"
 *                     workingTime:
 *                       type: string
 *                       description: Filial ish vaqti
 *                       example: "09:00-18:00"
 *                     location:
 *                       type: string
 *                       description: Filial manzili
 *                       example: "Toshkent sh., Chilonzor, 45-uy"
 *       400:
 *         description: Filial nomi allaqachon mavjud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Filial bazada mavjud"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
brancheRouter.post("/create_branche",chekAdmin as RequestHandler,validateBranche,createBranche as RequestHandler)

/**
 * @swagger
 * /branches/{id}:
 *   put:
 *     summary: Filial ma'lumotlarini yangilash
 *     description: Berilgan ID orqali filial ma'lumotlarini yangilaydi.
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Yangilanadigan filialning ID si
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brancheName:
 *                 type: string
 *                 description: Filial nomi (ixtiyoriy)
 *                 example: "Toshkent filiali"
 *               brancheAround:
 *                 type: string
 *                 description: Filial atrofidagi joylashuv (ixtiyoriy)
 *                 example: "Chilonzor tumani"
 *               workingTime:
 *                 type: string
 *                 description: Filial ish vaqti (ixtiyoriy)
 *                 example: "09:00-18:00"
 *               location:
 *                 type: string
 *                 description: Filial manzili (ixtiyoriy)
 *                 example: "Toshkent sh., Chilonzor, 45-uy"
 *     responses:
 *       200:
 *         description: Filial ma'lumotlari muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Filial ma‘lumotlari yangilandi"
 *       404:
 *         description: Filial topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Filial topilmadi"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
brancheRouter.put("/update_branche/:id",chekAdmin as RequestHandler,updateBranche as RequestHandler)

/**
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Filialni o‘chirish
 *     description: Berilgan ID orqali filialni tizimdan o‘chiradi.
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O‘chiriladigan filialning ID si
 *         example: 1
 *     responses:
 *       200:
 *         description: Filial muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Filial ma‘lumotlari o‘chirildi"
 *       404:
 *         description: Filial topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Filial topilmadi"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
brancheRouter.delete("/delete_branche/:id",chekAdmin as RequestHandler,deleteBranche as RequestHandler)

export default brancheRouter