import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../product/product.model';
import { ProductsService } from '../product/products.service';
import { AppEventModel } from '../state-transitions-config/app-event.model';
import { AppState } from '../state-transitions-config/app-states.enum';

/**
 * This service helps n state management for the application
 */
@Injectable({
  providedIn: 'root'
})
export class AppDataStoreService {

  protected productsStore = new BehaviorSubject<Product[]>([]);
  protected productStore = new BehaviorSubject<Product>(new Product());
  protected currentState = new BehaviorSubject<AppState>(AppState.UNKNOWN);
  public currentState$ = this.currentState.asObservable();
  protected preTransitionData = new BehaviorSubject<AppEventModel>(new AppEventModel());
  public preTransitionData$ = this.preTransitionData.asObservable();

  constructor(protected productsService: ProductsService) { }

  setPreTrnsitonData(preTransitionData: AppEventModel) {
    this.preTransitionData.next(preTransitionData);
  }

  getPreTrnsitonData(): AppEventModel {
    return this.preTransitionData.value;
  }

  setCurrentState(appState: AppState) {
    this.currentState.next(appState);
  }

  getCurrentState(): AppState {
    return this.currentState.getValue();
  }

  public setProducts(products: Product[]) {
    this.productsStore.next(products);
  }

  getProducts(): Product[] {
    return this.productsStore.getValue();
  }

  setProduct(product: Product) {
    this.productStore.next(product);
  }

  getProduct(id: number): Product {
    return this.productStore.getValue();
  }

  loadProducts() {
    this.productsService.getProducts().pipe(take(1)).subscribe(res => this.setProducts(res));
  }

  loadProduct(id: any) {
    this.productsService.getProduct(id).pipe(take(1)).subscribe(res => this.setProduct(res));
  }
}


