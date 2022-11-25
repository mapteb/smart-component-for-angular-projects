import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppData } from '../state-transitions-config/app-data.model';
import { AppEventModel } from '../state-transitions-config/app-event.model';
import { AppEvent } from '../state-transitions-config/app-events.enum';
import { AppState } from '../state-transitions-config/app-states.enum';
import { PreEventToProcessConfig, StateEventToPathConfig } from '../state-transitions-config/state-transitions';
import { AppDataStoreService } from '../state-transitions-config/app-data-store.service';

/**
 * This "Smart Component" ensures that only the pre-configured view transitions are allowed.
 * View transitions like clicking browser Back button, accessing bookmarked intermediate app URLs (like /products),
 * and accessing unknown URLs like /bla are prevented and redirected to "Page not Found".
 */
@Component({
  selector: 'app-base', template: ``
})
export class BaseComponent implements OnInit {
 
  protected appEventModel = new AppEventModel();

  constructor(protected location: Location, protected router: Router, protected appDataStore: AppDataStoreService) {
    if (router.url !== '/') {
      if (this.router.getCurrentNavigation()) {
        const navigationExtras = this.router.getCurrentNavigation()?.extras;
        if (navigationExtras && navigationExtras.state && navigationExtras.state['trsnData']) {
          this.appEventModel = navigationExtras.state['trsnData'];
          if (this.appDataStore.getPreTrnsitonData().appState !== this.appEventModel.appState) {
            const aem = this.appDataStore.getPreTrnsitonData();
            this.appEventModel = this.doTransition(this.appDataStore, aem.appEvent, aem.appState, aem.appData);
          } else {
            console.log('>> back to the extending component');
          }
        } else {
          if (this.router.url === '/home') {
            this.appEventModel = this.doTransition(this.appDataStore, AppEvent.home, AppState.UNKNOWN);
          } else {
            this.appEventModel = this.doTransition(this.appDataStore, AppEvent.unknown, AppState.UNKNOWN);
          }
        }
      } else {
        this.appEventModel = this.doTransition(this.appDataStore, AppEvent.unknown, AppState.UNKNOWN);
      }
    } else {
      console.log('>> back to the extending component');
    }
  }

  ngOnInit() {}

  /**
   * This is the engine of the Smart Component. It ensures that only pre-configured
   * view transitions succeed. appState and appEvent ar used to validate each transitions.
   * All supported view transitions are pre-configured in state-transitions.ts
   * 
   * @param appDataStore 
   * @param appEvent 
   * @param appState 
   * @param appData 
   * @returns AppEventModel
   */
  protected doTransition(appDataStore: AppDataStoreService, appEvent: AppEvent, appState: AppState, appData?: AppData): AppEventModel {
    let appEventModel = new AppEventModel();
    // if the appState and appEvent correspond to that configured then invoke the process
    if (StateEventToPathConfig[appState + '_' + appEvent]) {
      appEventModel.appEvent = appEvent;
      appEventModel.appState = appState;
      appEventModel.appData = appData ? appData : new AppData();

      // store the transition data so it an be used to restore a previous transition
      // Used to restore a view if the user happens to click the browser's Back button
      appDataStore.setPreTrnsitonData({ appEvent, appState, appData: appData ? appData : new AppData() });

      const path = StateEventToPathConfig[appState + '_' + appEvent];
      const appEventModelRes = PreEventToProcessConfig[appEventModel.appEvent]['process'](appEventModel, appDataStore);
      appDataStore.setCurrentState(appEventModelRes.appState);

      if (appEventModel.appEvent.toString().endsWith("_success")) {
        console.log('>> navigating to: ', path, appDataStore.getPreTrnsitonData());
        // this.router.navigate([path], { state: { trsnData: {appEvent, appState, appData} }});
        this.router.navigate([path], { state: { trsnData: appDataStore.getPreTrnsitonData() } });
      } else {
        // TODO: need to implement error transitions like products_error etc.
      }
    } else {
      this.router.navigate(['/**']);
    }
    return appEventModel;
  }
}
