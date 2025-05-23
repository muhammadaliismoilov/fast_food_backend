import { RequestHandler, Router } from "express";
import { createProduct, deleteProduct, filterProducts, getAllProduct, getOneProduct, searchProduct, updateProduct } from "../controller/products.ctr";
import { validateProduct } from "../middleware/products.middleware";
import { chekAdmin,chekSuperadmin} from "../middleware/chekAdmin";

const productsRouter = Router()

/**
 * @swagger
 * /get_products:
 *   get:
 *     summary: Barcha mahsulotlarni olish
 *     description: Tizimdagi barcha mahsulotlar ro‘yxatini qaytaradi.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Mahsulotlar ro‘yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Mahsulot ID
 *                     example: "prod-001"
 *                   productName:
 *                     type: string
 *                     description: Mahsulot nomi
 *                     example: "Burger"
 *                   categoryId:
 *                     type: string
 *                     description: Kategoriya ID
 *                     example: "cat-001"
 *                   price:
 *                     type: number
 *                     description: Mahsulot narxi
 *                     example: 25000
 *                   description:
 *                     type: string
 *                     description: Mahsulot haqida ma'lumot
 *                     example: "Mazali burger, yangi ingredientlar bilan tayyorlangan"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Mahsulot yaratilgan vaqt
 *                     example: "2025-05-23T11:01:00+05:00"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Mahsulot oxirgi yangilangan vaqt
 *                     example: "2025-05-23T11:01:00+05:00"
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
productsRouter.get("/get_products",getAllProduct as RequestHandler)

/**
 * @swagger
 * /get_one_product/{id}:
 *   get:
 *     summary: Bitta mahsulotni ID bo‘yicha olish
 *     description: Ma'lum bir mahsulotni ID bo‘yicha qaytaradi.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Mahsulot ID
 *     responses:
 *       200:
 *         description: Mahsulot muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
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
 *                 price:
 *                   type: number
 *                   description: Mahsulot narxi
 *                   example: 25000
 *                 description:
 *                   type: string
 *                   description: Mahsulot haqida ma'lumot
 *                   example: "Mazali burger, yangi ingredientlar bilan tayyorlangan"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Mahsulot yaratilgan vaqt
 *                   example: "2025-05-23T11:01:00+05:00"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Mahsulot oxirgi yangilangan vaqt
 *                   example: "2025-05-23T11:01:00+05:00"
 *       404:
 *         description: Mahsulot topilmadi
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
productsRouter.get("/get_one_product/:id",getOneProduct as RequestHandler)

/**
 * @swagger
 * /search_product:
 *   get:
 *     summary: Mahsulotlarni qidirish
 *     description: Mahsulot nomiga ko‘ra qidiruv amalga oshiradi.
 *     tags: [Products]
 *     parameters:
 *       - name: productName
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Qidiruv so‘zi (mahsulot nomi)
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
 *                     description: Mahsulot ID
 *                     example: "prod-001"
 *                   productName:
 *                     type: string
 *                     description: Mahsulot nomi
 *                     example: "Burger"
 *                   categoryId:
 *                     type: string
 *                     description: Kategoriya ID
 *                     example: "cat-001"
 *                   price:
 *                     type: number
 *                     description: Mahsulot narxi
 *                     example: 25000
 *                   description:
 *                     type: string
 *                     description: Mahsulot haqida ma'lumot
 *                     example: "Mazali burger, yangi ingredientlar bilan tayyorlangan"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Mahsulot yaratilgan vaqt
 *                     example: "2025-05-23T11:01:00+05:00"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Mahsulot oxirgi yangilangan vaqt
 *                     example: "2025-05-23T11:01:00+05:00"
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
 *         description: Mahsulot topilmadi
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
productsRouter.get("/search_product",searchProduct as RequestHandler)

/**
 * @swagger
 * /filter_products:
 *   get:
 *     summary: Mahsulotlarni filtr qilish
 *     description: Mahsulotlarni narxi yoki nomi bo‘yicha tartiblab filtrlaydi (narx bo‘yicha o‘sish yoki kamayish, nom bo‘yicha A-Z yoki Z-A).
 *     tags: [Products]
 *     parameters:
 *       - name: sortBy
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, name_asc, name_desc]
 *         description: Tartiblash turi (price_asc, price_desc, name_asc, name_desc)
 *     responses:
 *       200:
 *         description: Filtrlangan mahsulotlar ro‘yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Mahsulot ID
 *                     example: "prod-001"
 *                   productName:
 *                     type: string
 *                     description: Mahsulot nomi
 *                     example: "Burger"
 *                   categoryId:
 *                     type: string
 *                     description: Kategoriya ID
 *                     example: "cat-001"
 *                   price:
 *                     type: number
 *                     description: Mahsulot narxi
 *                     example: 25000
 *                   description:
 *                     type: string
 *                     description: Mahsulot haqida ma'lumot
 *                     example: "Mazali burger, yangi ingredientlar bilan tayyorlangan"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Mahsulot yaratilgan vaqt
 *                     example: "2025-05-23T11:14:00+05:00"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Mahsulot oxirgi yangilangan vaqt
 *                     example: "2025-05-23T11:14:00+05:00"
 *       400:
 *         description: Noto‘g‘ri tartiblash turi kiritildi yoki tartiblash turi kiritilmadi
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
 *                   example: "Noto‘g‘ri tartiblash turi kiritildi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 *       404:
 *         description: Mahsulotlar topilmadi
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
 *                   example: "Mahsulotlar topilmadi"
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
productsRouter.get("/filter_products", filterProducts as RequestHandler);

/**
 * @swagger
 * /create_product:
 *   post:
 *     summary: Yangi mahsulot qo‘shish
 *     description: Yangi mahsulotni bazaga qo‘shadi, agar kategoriya mavjud bo‘lsa.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Mahsulot nomi
 *                 example: "Burger"
 *               categoryId:
 *                 type: string
 *                 description: Kategoriya ID
 *                 example: "cat-001"
 *               price:
 *                 type: number
 *                 description: Mahsulot narxi
 *                 example: 25000
 *               description:
 *                 type: string
 *                 description: Mahsulot haqida ma'lumot
 *                 example: "Mazali burger, yangi ingredientlar bilan tayyorlangan"
 *             required:
 *               - productName
 *               - categoryId
 *               - price
 *               - description
 *     responses:
 *       200:
 *         description: Mahsulot muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Yangi mahsulot qo`shildi"
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Mahsulot ID
 *                       example: "prod-001"
 *                     productName:
 *                       type: string
 *                       description: Mahsulot nomi
 *                       example: "Burger"
 *                     categoryId:
 *                       type: string
 *                       description: Kategoriya ID
 *                       example: "cat-001"
 *                     price:
 *                       type: number
 *                       description: Mahsulot narxi
 *                       example: 25000
 *                     description:
 *                       type: string
 *                       description: Mahsulot haqida ma'lumot
 *                       example: "Mazali burger, yangi ingredientlar bilan tayyorlangan"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Mahsulot yaratilgan vaqt
 *                       example: "2025-05-23T11:01:00+05:00"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Mahsulot oxirgi yangilangan vaqt
 *                       example: "2025-05-23T11:01:00+05:00"
 *       400:
 *         description: Kategoriya topilmadi
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
 *                   example: "Categorya bazada mavjud emas!"
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
productsRouter.post("/create_product",chekAdmin as RequestHandler,validateProduct as RequestHandler,createProduct as RequestHandler)

/**
 * @swagger
 * /update_product/{id}:
 *   put:
 *     summary: Mahsulotni yangilash
 *     description: Ma'lum bir mahsulotni ID bo‘yicha yangilaydi.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Mahsulot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Yangi mahsulot nomi
 *                 example: "Pizza"
 *               categoryId:
 *                 type: string
 *                 description: Yangi kategoriya ID
 *                 example: "cat-002"
 *               price:
 *                 type: number
 *                 description: Yangi mahsulot narxi
 *                 example: 30000
 *               description:
 *                 type: string
 *                 description: Yangi mahsulot haqida ma'lumot
 *                 example: "Mazali pizza, yangi ingredientlar bilan tayyorlangan"
 *             required:
 *               - productName
 *               - categoryId
 *               - price
 *               - description
 *     responses:
 *       200:
 *         description: Mahsulot muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Malumotlar yangilandi"
 *       404:
 *         description: Mahsulot topilmadi
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
productsRouter.put("/update_product/:id",chekAdmin as RequestHandler,updateProduct as RequestHandler)

/**
 * @swagger
 * /delete_product/{id}:
 *   delete:
 *     summary: Mahsulotni o‘chirish
 *     description: Ma'lum bir mahsulotni ID bo‘yicha o‘chiradi.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Mahsulot ID
 *     responses:
 *       200:
 *         description: Mahsulot muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Malumotlar yangilandi"
 *       404:
 *         description: Mahsulot topilmadi
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
productsRouter.delete("/delete_product/:id",chekAdmin as RequestHandler,deleteProduct as RequestHandler)
export default productsRouter








