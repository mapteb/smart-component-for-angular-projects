import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { AppEvent } from '../state-transitions-config/app-events.enum';
import { AppState } from '../state-transitions-config/app-states.enum';
import { AppDataStoreService } from '../state-transitions-config/app-data-store.service';

/**
 * This Angular component loads a view with a
 * site layout. Enables navigating to all other views.
 * Extends the BaseComponent so it can delegate handling the events raised
 * on the layout view.
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent extends BaseComponent implements OnInit {

  title = "A Smart Component for Angular Pojects.";
  currentState$: Observable<AppState>;

  constructor(protected override location: Location, protected override router: Router,
    protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
    this.currentState$ = this.appDataStore.currentState$;
  }

  override ngOnInit(): void {

  }

  // a handler for the user raised event
  // delegate the event handling to the base class
  handleHomeEvent() {
    this.doTransition(this.appDataStore, AppEvent.home, this.appDataStore.getCurrentState());
  }

  // a handler for the user raised event
  // delegate the event handling to the base class
  handleProductsEvent() {
    this.doTransition(this.appDataStore, AppEvent.products, this.appDataStore.getCurrentState());
  }
}
