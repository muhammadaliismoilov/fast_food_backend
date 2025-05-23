import { RequestHandler, Router } from "express";
import { validateOrder } from "../middleware/order.middleware";
import { chekAdmin,chekSuperadmin} from "../middleware/chekAdmin";
import { createOrder, deleteOrder, getAllOrder, getOneOrder, updateOrder } from "../controller/order.ctr";

const ordersRouter = Router()

/**
 * @swagger
 * /get_orders:
 *   get:
 *     summary: Barcha buyurtmalarni olish
 *     description: Tizimdagi barcha buyurtmalar ro‘yxatini qaytaradi.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Buyurtmalar ro‘yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Buyurtma ID
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   userId:
 *                     type: string
 *                     description: Foydalanuvchi ID
 *                     example: "user-001"
 *                   productId:
 *                     type: string
 *                     description: Mahsulot ID
 *                     example: "prod-001"
 *                   categoryId:
 *                     type: string
 *                     description: Kategoriya ID
 *                     example: "cat-001"
 *                   brancheId:
 *                     type: string
 *                     description: Filial ID
 *                     example: "branch-001"
 *                   position:
 *                     type: string
 *                     description: Buyurtma holati
 *                     example: "yangi"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Buyurtma yaratilgan vaqt
 *                     example: "2025-05-23T10:53:00+05:00"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Buyurtma oxirgi yangilangan vaqt
 *                     example: "2025-05-23T10:53:00+05:00"
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
ordersRouter.get("/get_orders",getAllOrder as RequestHandler)

/**
 * @swagger
 * /get_one_order/{id}:
 *   get:
 *     summary: Bitta buyurtmani ID bo‘yicha olish
 *     description: Ma'lum bir buyurtmani ID bo‘yicha qaytaradi, shu bilan birga bog‘liq ma’lumotlarni o‘z ichiga oladi.
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Buyurtma ID
 *     responses:
 *       200:
 *         description: Buyurtma muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Buyurtma ID
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 userId:
 *                   type: string
 *                   description: Foydalanuvchi ID
 *                   example: "user-001"
 *                 userName:
 *                   type: string
 *                   description: Foydalanuvchi ismi
 *                   example: "Ali Valiev"
 *                 productId:
 *                   type: string
 *                   description: Mahsulot ID
 *                   example: "prod-001"
 *                 productName:
 *                   type: string
 *                   description: Mahsulot nomi
 *                   example: "Burger"
 *                 categoryId:
 *                   type: string
 *                   description: Kategoriya ID
 *                   example: "cat-001"
 *                 categoryName:
 *                   type: string
 *                   description: Kategoriya nomi
 *                   example: "Fast Food"
 *                 brancheId:
 *                   type: string
 *                   description: Filial ID
 *                   example: "branch-001"
 *                 brancheName:
 *                   type: string
 *                   description: Filial nomi
 *                   example: "Toshkent filiali"
 *                 position:
 *                   type: string
 *                   description: Buyurtma holati
 *                   example: "yangi"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Buyurtma yaratilgan vaqt
 *                   example: "2025-05-23T10:53:00+05:00"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Buyurtma oxirgi yangilangan vaqt
 *                   example: "2025-05-23T10:53:00+05:00"
 *       404:
 *         description: Buyurtma topilmadi
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
 *                   example: "Buyurtma topilmadi!"
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
ordersRouter.get("/get_one_order/:id",getOneOrder as RequestHandler)

/**
 * @swagger
 * /create_order:
 *   post:
 *     summary: Yangi buyurtma qo‘shish
 *     description: Yangi buyurtmani bazaga qo‘shadi, agar barcha bog‘liq ma’lumotlar mavjud bo‘lsa.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Foydalanuvchi ID
 *                 example: "user-001"
 *               productId:
 *                 type: string
 *                 description: Mahsulot ID
 *                 example: "prod-001"
 *               categoryId:
 *                 type: string
 *                 description: Kategoriya ID
 *                 example: "cat-001"
 *               brancheId:
 *                 type: string
 *                 description: Filial ID
 *                 example: "branch-001"
 *               position:
 *                 type: string
 *                 description: Buyurtma holati
 *                 example: "yangi"
 *             required:
 *               - userId
 *               - productId
 *               - categoryId
 *               - brancheId
 *     responses:
 *       200:
 *         description: Buyurtma muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Yangi buyurtma qo‘shildi"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Buyurtma ID
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     userName:
 *                       type: string
 *                       description: Foydalanuvchi ismi
 *                       example: "Ali Valiev"
 *                     productName:
 *                       type: string
 *                       description: Mahsulot nomi
 *                       example: "Burger"
 *                     categoryName:
 *                       type: string
 *                       description: Kategoriya nomi
 *                       example: "Fast Food"
 *                     brancheName:
 *                       type: string
 *                       description: Filial nomi
 *                       example: "Toshkent filiali"
 *                     userId:
 *                       type: string
 *                       description: Foydalanuvchi ID
 *                       example: "user-001"
 *                     productId:
 *                       type: string
 *                       description: Mahsulot ID
 *                       example: "prod-001"
 *                     categoryId:
 *                       type: string
 *                       description: Kategoriya ID
 *                       example: "cat-001"
 *                     brancheId:
 *                       type: string
 *                       description: Filial ID
 *                       example: "branch-001"
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
 *                   example: "Kategoriya bazada mavjud emas!"
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
ordersRouter.post("/create_order",validateOrder as RequestHandler,createOrder as RequestHandler)

/**
 * @swagger
 * /update_order/{id}:
 *   put:
 *     summary: Buyurtmani yangilash
 *     description: Ma'lum bir buyurtmani ID bo‘yicha yangilaydi.
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Buyurtma ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Yangi foydalanuvchi ID
 *                 example: "user-002"
 *               productId:
 *                 type: string
 *                 description: Yangi mahsulot ID
 *                 example: "prod-002"
 *               categoryId:
 *                 type: string
 *                 description: Yangi kategoriya ID
 *                 example: "cat-002"
 *               brancheId:
 *                 type: string
 *                 description: Yangi filial ID
 *                 example: "branch-002"
 *               position:
 *                 type: string
 *                 description: Yangi buyurtma holati
 *                 example: "qabul qilingan"
 *             required:
 *               - userId
 *               - productId
 *               - categoryId
 *               - brancheId
 *     responses:
 *       200:
 *         description: Buyurtma muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ma'lumotlar yangilandi"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Buyurtma ID
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     userName:
 *                       type: string
 *                       description: Foydalanuvchi ismi
 *                       example: "Ali Valiev"
 *                     productName:
 *                       type: string
 *                       description: Mahsulot nomi
 *                       example: "Pizza"
 *                     categoryName:
 *                       type: string
 *                       description: Kategoriya nomi
 *                       example: "Fast Food"
 *                     brancheName:
 *                       type: string
 *                       description: Filial nomi
 *                       example: "Toshkent filiali"
 *                     position:
 *                       type: string
 *                       description: Buyurtma holati
 *                       example: "qabul qilingan"
 *       400:
 *         description: Buyurtma ID si taqdim etilmadi
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
 *                   example: "Buyurtma ID si taqdim etilmadi!"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 *       404:
 *         description: Buyurtma topilmadi
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
 *                   example: "Buyurtma topilmadi!"
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
ordersRouter.put("/update_order/:id",chekAdmin as RequestHandler,updateOrder as RequestHandler)

/**
 * @swagger
 * /delete_order/{id}:
 *   delete:
 *     summary: Buyurtmani o‘chirish
 *     description: Ma'lum bir buyurtmani ID bo‘yicha o‘chiradi.
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Buyurtma ID
 *     responses:
 *       200:
 *         description: Buyurtma muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Buyutrma bekor qilindi"
 *       404:
 *         description: Buyurtma topilmadi
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
ordersRouter.delete("/delete_order/:id",chekAdmin as RequestHandler,deleteOrder as RequestHandler)

export default ordersRouter



