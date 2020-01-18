import { IProduct } from '../interfaces/product.interface'
import {
    Observable,
    of
} from 'rxjs'
import {products} from '../products'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn:'root'
})
export class ProductService{
    constructor() {
    }

    public fetchProductsFromServer():Observable<IProduct[]>{

        return of(products)
    }
}
