import { RequestHandler, Router } from "express";

import { validateReports } from "../middleware/report.middleware";
import { chekAdmin,chekSuperadmin} from "../middleware/chekAdmin";
import { createReport, deleteReports, getAllReports, getOneReports, searchReports, updateReports } from "../controller/report.ctr";

const reportsRouter = Router()

/**
 * @swagger
 * /get_reports:
 *   get:
 *     summary: Barcha hisobotlarni olish
 *     description: Tizimdagi barcha hisobotlar ro‘yxatini qaytaradi.
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Hisobotlar ro‘yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Hisobot ID
 *                     example: "rep-001"
 *                   brancheName:
 *                     type: string
 *                     description: Filial nomi
 *                     example: "Toshkent filiali"
 *                   orderQuantity:
 *                     type: number
 *                     description: Buyurtma soni
 *                     example: 25000
 *                   client:
 *                     type: string
 *                     description: Mijoz ismi
 *                     example: "Ali Valiev"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Hisobot yaratilgan vaqt
 *                     example: "2025-05-23T11:04:00+05:00"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Hisobot oxirgi yangilangan vaqt
 *                     example: "2025-05-23T11:04:00+05:00"
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
reportsRouter.get("/get_reports",getAllReports as RequestHandler)

/**
 * @swagger
 * /get_one_report/{id}:
 *   get:
 *     summary: Bitta hisobotni ID bo‘yicha olish
 *     description: Ma'lum bir hisobotni ID bo‘yicha qaytaradi.
 *     tags: [Reports]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Hisobot ID
 *     responses:
 *       200:
 *         description: Hisobot muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Hisobot ID
 *                   example: "rep-001"
 *                 brancheName:
 *                   type: string
 *                   description: Filial nomi
 *                   example: "Toshkent filiali"
 *                 orderQuantity:
 *                   type: number
 *                   description: Buyurtma soni
 *                   example: 25000
 *                 client:
 *                   type: string
 *                   description: Mijoz ismi
 *                   example: "Ali Valiev"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Hisobot yaratilgan vaqt
 *                   example: "2025-05-23T11:04:00+05:00"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Hisobot oxirgi yangilangan vaqt
 *                   example: "2025-05-23T11:04:00+05:00"
 *       404:
 *         description: Hisobot topilmadi
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
 *                   example: "Xisbot topilmadi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
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
reportsRouter.get("/get_one_report/:id",getOneReports as RequestHandler)

/**
 * @swagger
 * /search_report:
 *   get:
 *     summary: Hisobotlarni qidirish
 *     description: Filial nomi bo‘yicha hisobotlarni qidiradi.
 *     tags: [Reports]
 *     parameters:
 *       - name: brancheName
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Qidiruv so‘zi (filial nomi)
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
 *                     type: string
 *                     description: Hisobot ID
 *                     example: "rep-001"
 *                   brancheName:
 *                     type: string
 *                     description: Filial nomi
 *                     example: "Toshkent filiali"
 *                   orderQuantity:
 *                     type: number
 *                     description: Buyurtma soni
 *                     example: 25000
 *                   client:
 *                     type: string
 *                     description: Mijoz ismi
 *                     example: "Ali Valiev"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Hisobot yaratilgan vaqt
 *                     example: "2025-05-23T11:04:00+05:00"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Hisobot oxirgi yangilangan vaqt
 *                     example: "2025-05-23T11:04:00+05:00"
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
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 *       404:
 *         description: Hisobot topilmadi
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
 *                   example: "Xisobot topilmadi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
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
reportsRouter.get("/search_report",searchReports as RequestHandler)

/**
 * @swagger
 * /create_report:
 *   post:
 *     summary: Yangi hisobot qo‘shish
 *     description: Yangi hisobotni bazaga qo‘shadi, agar barcha bog‘liq ma’lumotlar mavjud bo‘lsa.
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brancheName:
 *                 type: string
 *                 description: Filial nomi
 *                 example: "Toshkent filiali"
 *               orderQuantity:
 *                 type: number
 *                 description: Buyurtma soni (narx sifatida ishlatiladi)
 *                 example: 25000
 *               client:
 *                 type: string
 *                 description: Mijoz ismi
 *                 example: "Ali Valiev"
 *             required:
 *               - brancheName
 *               - orderQuantity
 *               - client
 *     responses:
 *       200:
 *         description: Hisobot muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xisobot qo`shildi"
 *                 newRepoet:
 *                   type: object
 *                   properties:
 *                     brancheName:
 *                       type: string
 *                       description: Filial nomi
 *                       example: "Toshkent filiali"
 *                     orderQuantity:
 *                       type: number
 *                       description: Buyurtma soni
 *                       example: 25000
 *                     client:
 *                       type: string
 *                       description: Mijoz ismi
 *                       example: "Ali Valiev"
 *       400:
 *         description: Bog‘liq ma’lumotlar topilmadi
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
 *                   example: "Bu filial bazada mavjud emas!"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
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
reportsRouter.post("/create_report",validateReports as RequestHandler,createReport as RequestHandler)

/**
 * @swagger
 * /update_report/{id}:
 *   put:
 *     summary: Hisobotni yangilash
 *     description: Ma'lum bir hisobotni ID bo‘yicha yangilaydi.
 *     tags: [Reports]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Hisobot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brancheName:
 *                 type: string
 *                 description: Yangi filial nomi
 *                 example: "Samarqand filiali"
 *               orderQuantity:
 *                 type: number
 *                 description: Yangi buyurtma soni
 *                 example: 30000
 *               client:
 *                 type: string
 *                 description: Yangi mijoz ismi
 *                 example: "Vali Ahmadov"
 *             required:
 *               - brancheName
 *               - orderQuantity
 *               - client
 *     responses:
 *       200:
 *         description: Hisobot muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Malumotlar yangilandi"
 *       404:
 *         description: Hisobot topilmadi
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
 *                   example: "Mahsulot topilmadi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
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
reportsRouter.put("/update_report/:id",chekAdmin as RequestHandler,updateReports as RequestHandler)

/**
 * @swagger
 * /delete_report/{id}:
 *   delete:
 *     summary: Hisobotni o‘chirish
 *     description: Ma'lum bir hisobotni ID bo‘yicha o‘chiradi.
 *     tags: [Reports]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Hisobot ID
 *     responses:
 *       200:
 *         description: Hisobot muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Malumotlar yangilandi"
 *       404:
 *         description: Hisobot topilmadi
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
 *                   example: "Xisobot topilmadi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
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
reportsRouter.delete("/delete_report/:id",chekAdmin as RequestHandler,deleteReports as RequestHandler)


export default reportsRouter


