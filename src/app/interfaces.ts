export interface Product {
    id: number;
    name: string;
    price: number;
    quantity?: number; //Quantity of the product selected by the user
    desc: string;
    categories: string[];
    imgPath: string;
}

export interface ProductDetail {
    id: number;
    idProduct: number; // foreign key of product
    detailDesc: string;
    technicalData: string;
}