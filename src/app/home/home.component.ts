import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { AppDataStoreService } from '../state-transitions-manager/app-data-store.service';
import { AppState } from '../state-transitions-config/app-states.enum';

/**
 * This Angular component loads the HOME view.
 * Extends the BaseComponent so it can delegate handling the events raised
 * on the HOME view.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(protected override location: Location, protected override router: Router,
    protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
  }

  override ngOnInit(): void { }
}
