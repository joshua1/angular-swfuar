import { BaseStore } from "./base.store";
import { IProduct } from "../interfaces/product.interface";
import { ProductService } from "../api-service/product.service";
import {
  inject,
  Injectable
} from '@angular/core'

@Injectable({
  providedIn:'root'
})
export class ProductStore extends BaseStore<IProduct[]> {
  constructor(private _productService: ProductService) {
    super([]);
  }

  //effect like in ngrx
  public loadStoreFromBackend() {
    this._productService.fetchProductsFromServer().subscribe(products => {
      this.setCollectionState(products);
    });
  }
}
