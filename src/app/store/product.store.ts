import { BaseStore } from './base.store'
import { IProduct } from '../interfaces/product.interface'
import {products} from '../products'

 export class ProductStore extends BaseStore<IProduct[]>{
    constructor() {
        super(products);
    }
}




