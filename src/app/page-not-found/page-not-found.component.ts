import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { AppEvent } from '../state-transitions-config/app-events.enum';
import { AppDataStoreService } from '../state-transitions-manager/app-data-store.service';
import { AppState } from '../state-transitions-config/app-states.enum';

/**
 * This Angular component displays an error message
 * when the navigation request does not conform to one of the
 * the pre-configured state transitions.
 */
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent extends BaseComponent implements OnInit {

  message = '';

  constructor(protected override location: Location, protected override router: Router,
    protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
  }

  override ngOnInit(): void {
    this.appDataStore.setCurrentState(AppState.UNKNOWN);
    if (this.appEventModel && this.appEventModel.message) {
      this.message = this.appEventModel.message.error;
    } else {
      this.message = 'Unknown access error';
    }
  }
}
