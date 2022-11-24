import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppEventModel } from 'src/app/state-transitions-config/app-event.model';
import { AppData } from 'src/app/state-transitions-config/app-data.model';
import { AppEvent } from 'src/app/state-transitions-config/app-events.enum';
import { AppState } from 'src/app/state-transitions-config/app-states.enum';
import { AppDataStoreService } from 'src/app/state-transitions-manager/app-data-store.service';
import { ProductsService } from 'src/app/product/products.service';
import { Product } from '../product/product.model';
import { Router } from '@angular/router';

import { StateEventToPathConfig } from '../state-transitions-config/state-transitions';
import { BaseComponent } from '../base/base.component';

describe('Unit test each state transition:', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let router: Router;
  let appDataStore: AppDataStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ BaseComponent ],
      providers: [ProductsService, AppDataStoreService]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    appDataStore = TestBed.inject(AppDataStoreService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
  });

  it('GIVEN: begin state UNKNOWN WHEN: home event triggered THEN: final state is HOMEVIEW', () => {

    //@ts-ignore
    component.doTransition(appDataStore, AppEvent.home, AppState.UNKNOWN);
    const finalState: AppState = appDataStore.getCurrentState();
    expect(finalState).toBe(AppState.HOMEVIEW);
  });

  it('GIVEN: begin state HOMEVIEW WHEN: products event triggered THEN: final state is PRODUCTSVIEW', () => {
    //@ts-ignore
    component.doTransition(appDataStore, AppEvent.products, AppState.HOMEVIEW);
    const finalState: AppState = appDataStore.getCurrentState();
    expect(finalState).toBe(AppState.PRODUCTSVIEW);
  });

  it('GIVEN: begin state PRODUCTSVIEW WHEN: product event triggered THEN: final state is PRODUCTVIEW', () => {
    const appData = new AppData();
    const product = new Product(1);
    appData.product = product;
    //@ts-ignore
    component.doTransition(appDataStore, AppEvent.product, AppState.PRODUCTSVIEW, appData);
    const finalState: AppState = appDataStore.getCurrentState();
    expect(finalState).toBe(AppState.PRODUCTVIEW);
  });

  it('GIVEN: begin state PRODUCTVIEW WHEN: products event triggered THEN: final state is PRODUCTSVIEW', () => {
    //@ts-ignore
    component.doTransition(appDataStore, AppEvent.products, AppState.PRODUCTVIEW);
    const finalState: AppState = appDataStore.getCurrentState();
    expect(finalState).toBe(AppState.PRODUCTSVIEW);
  });

  it('GIVEN: begin state PRODUCTSVIEW WHEN: home event triggered THEN: final state is HOMEVIEW', () => {
    //@ts-ignore
    component.doTransition(appDataStore, AppEvent.home, AppState.PRODUCTSVIEW);
    const finalState: AppState = appDataStore.getCurrentState();
    expect(finalState).toBe(AppState.HOMEVIEW);
  });

  it('GIVEN: begin state PRODUCTVIEW WHEN: home event triggered THEN: final state is HOMEVIEW', () => {
    //@ts-ignore
    component.doTransition(appDataStore, AppEvent.home, AppState.PRODUCTVIEW);
    const finalState: AppState = appDataStore.getCurrentState();
    expect(finalState).toBe(AppState.HOMEVIEW);
  });
});
