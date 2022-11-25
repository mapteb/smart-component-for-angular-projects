import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppEvent } from '../../state-transitions-config/app-events.enum';
import { AppDataStoreService } from '../../state-transitions-config/app-data-store.service';
import { BaseComponent } from '../../base/base.component';
import { AppData } from '../../state-transitions-config/app-data.model';
import { AppState } from '../../state-transitions-config/app-states.enum';
import { Product } from '../product.model';

/**
 * This Angular component loads the PRODUCTS view.
 * Extends the BaseComponent so it can delegate handling the events raised
 * on the PRODUCTS view.
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  products: Product[] = [];

  constructor(protected override location: Location, protected override router: Router, protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
  }

  override ngOnInit(): void {
    this.products = this.appDataStore.getProducts();
  }

  // delegates the event to the Smart Component
  // by specifying the event name and current view name
  // and app data
  handlePoductEvent(productId: any) {
    const appData = new AppData();
    appData.product.id = productId;
    this.appEventModel = this.doTransition(this.appDataStore, AppEvent.product, AppState.PRODUCTSVIEW, appData);
  }
}
