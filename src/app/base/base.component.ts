import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppData } from '../state-transitions-config/app-data.model';
import { AppEventModel } from '../state-transitions-config/app-event.model';
import { AppEvent } from '../state-transitions-config/app-events.enum';
import { AppState } from '../state-transitions-config/app-states.enum';
import { PreEventToProcessConfig, StateEventToPathConfig } from '../state-transitions-config/state-transitions.config';
import { AppDataStoreService } from '../state-transitions-config/app-data-store.service';

/**
 * This "Smart Component" ensures that only the pre-configured view transitions are allowed.
 * View transitions by clicking browser Back button or accessing bookmarked intermediate app URLs (like /products),
 * are prevented and redirected to "Page not Found" page. However, the bookmarked URL navigation can 
 * be supported by expicitly configuring in the state-transitions.config.ts file. See the file comments in
 * state-transitions.config.ts. To support Back button navigation remove the preTransitionData property in 
 * app-data-store.service.ts.
 */
@Component({
  selector: 'app-base', template: ``
})
export class BaseComponent implements OnInit {
 
  protected appEventModel = new AppEventModel();

  constructor(protected location: Location, protected router: Router, protected appDataStore: AppDataStoreService) {
    if (router.url !== '/') {
      if (this.router.getCurrentNavigation()) {
        const navigationExtras = router.getCurrentNavigation()?.extras;
        if (navigationExtras && navigationExtras.state && navigationExtras.state['trsnData']) {
          this.appEventModel = navigationExtras.state['trsnData'];
          if (appDataStore.getPreTrnsitonData().appState !== this.appEventModel.appState) {
            const aem = appDataStore.getPreTrnsitonData();
            this.appEventModel = this.doTransition(appDataStore, aem.appEvent, aem.appState, aem.appData);
          } else {
            console.log('>> back to the extending component');
          }
        } else {
          if (router.url === '/home') {
            this.appEventModel = this.doTransition(appDataStore, AppEvent.home, AppState.UNKNOWN);
          } else {
            this.appEventModel = this.doTransition(appDataStore, AppEvent.unknown, AppState.UNKNOWN);
          }
        }
      } else {
        this.appEventModel = this.doTransition(appDataStore, AppEvent.unknown, AppState.UNKNOWN);
      }
    } else {
      console.log('>> back to the extending component');
    }
  }

  ngOnInit() {}

  /**
   * This is the "engine" of the Smart Component. It ensures that only pre-configured
   * view transitions succeed. It uses the appState and appEvent to validate each transition.
   * All supported view transitions are pre-configured in state-transitions.config.ts
   * 
   * TODO: This method can be modified to check whether the user is authenticated and authorized
   * by adding a user property in the AppData class. A login component can populate the appData.user
   * Also see the file comments in state-transitions.config.ts.
   * 
   * @param appDataStore 
   * @param appEvent 
   * @param appState 
   * @param appData 
   * @returns AppEventModel
   */
  protected doTransition(appDataStore: AppDataStoreService, appEvent: AppEvent, appState: AppState, appData?: AppData): AppEventModel {
    let appEventModel = new AppEventModel();
    // First guard condition - Given State When Event Then transition
    // TODO: implement authentication and authrorization guards by inspecting appData.user

    // If a path is configured in state-transition.config.ts for the appState and appEvent.
    const path = StateEventToPathConfig[appState + '_' + appEvent];
    if (path) {
      appEventModel.appEvent = appEvent;
      appEventModel.appState = appState;
      appEventModel.appData = appData ? appData : new AppData();

      // store the transition data so it an be used to restore a previous transition
      // This is used to restore a view if the user happens to click the browser's Back button
      appDataStore.setPreTrnsitonData({ appEvent, appState, appData: appData ? appData : new AppData() });

      // Call the process to pre-fetch data for the view
      appEventModel = PreEventToProcessConfig[appEventModel.appEvent]['process'](appEventModel, appDataStore);
      appDataStore.setCurrentState(appEventModel.appState);

      // If the process returns a success then route to the path
      if (appEventModel.appEvent.toString().endsWith("_success")) {
        console.log('>> navigating to: ', path, appDataStore.getPreTrnsitonData());
        // this.router.navigate([path], { state: { trsnData: {appEvent, appState, appData} }});
        this.router.navigate([path], { state: { trsnData: appDataStore.getPreTrnsitonData() } });
      } else {
        // TODO: need to implement error transitions like products_error etc.
      }
    } else {
      // Page not found
      this.router.navigate(['/**']);
    }
    return appEventModel;
  }
}
