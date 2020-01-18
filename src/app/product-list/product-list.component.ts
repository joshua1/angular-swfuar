import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { products } from '../products';
import { ProductStore } from '../store/product.store'
import { IProduct } from '../interfaces/product.interface'
import {
  BehaviorSubject,
  Subject
} from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy{
  private products: IProduct[]=[]
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private _productStore: ProductStore) {
  }

  share() {
    window.alert('The product has been shared!');
  }

  public ngOnInit(): void {
    this._productStore.loadStoreFromBackend() //fetching
    this._productStore.getState()    //subscription
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(productsFromStore=>{
      this.products.length=0
      this.products=productsFromStore
    })
  }

  public addProduct() { //adding to store
    let currentProductList = this._productStore.getStateSnapshot();
   const newProductList = [
      ...currentProductList,
      {
        description: 'Mashadi Product',
        name: `Mash ${currentProductList.length+1}`,
        price: 29.70
      }
    ]

    this._productStore.setCollectionState(newProductList) //Note: For a single Object Store , you use
    // setState(partialObject)
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
