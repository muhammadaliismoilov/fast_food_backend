export interface ICreateOrder {
    id?: number;
    userId?: number;
    productId?: number;
    categoryId?: number;
    brancheId?: number;
    position?: "yangi" | "qabul qilingan" | "jo`natilgan" | "yopilgan"

}