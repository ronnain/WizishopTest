export interface Product {
    id: number;
    name: string;
    price: number;
    quantity?: number; //Quantity of the product selected by the user
    desc: string;
    categories: string[];
    imgPath: string;
}