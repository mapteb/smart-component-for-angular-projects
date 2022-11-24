import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppData } from '../state-transitions-config/app-data.model';
import { AppEventModel } from '../state-transitions-config/app-event.model';
import { AppEvent } from '../state-transitions-config/app-events.enum';
import { AppState } from '../state-transitions-config/app-states.enum';
import { PreEventToProcessConfig, StateEventToPathConfig } from '../state-transitions-config/state-transitions';
import { AppDataStoreService } from '../state-transitions-manager/app-data-store.service';

/**
 * This Angular base component ensures that all navigation
 * requests are routed through the StateTransitionsManagerComponent.
 * Otherwise, the user is redirected to the home page.
 */
@Component({
  selector: 'app-base', template: ``
})
export class BaseComponent implements OnInit {
  protected appEventModel: AppEventModel;

  constructor(protected location: Location, protected router: Router, protected appDataStore: AppDataStoreService) {
    console.log('>> handling path:', this.router.url);
    if (router.url !== '/') {
      if (this.router.getCurrentNavigation()) {
        const navigationExtras = this.router.getCurrentNavigation()?.extras;
        if (navigationExtras && navigationExtras.state && navigationExtras.state['trsnData']) {
          this.appEventModel = navigationExtras.state['trsnData'];
          console.log('>> cur | recd: ', this.appDataStore.getPreTrnsitonData().appState, this.appEventModel.appState);
          if (this.appDataStore.getPreTrnsitonData().appState !== this.appEventModel.appState) {
            const aem = this.appDataStore.getPreTrnsitonData();
            console.log('>> Revert Back button navigation', aem);
            this.appEventModel = this.doTransition(this.appDataStore, aem.appEvent, aem.appState, aem.appData);
          } else {
            console.log('>> transition success ');
          }
        } else {
          console.log('>> no transition data found', );
          if (this.router.url === '/home') {
            this.appEventModel = this.doTransition(this.appDataStore, AppEvent.home, AppState.UNKNOWN);
          } else {
            this.appEventModel = this.doTransition(this.appDataStore, AppEvent.unknown, AppState.UNKNOWN);
          }
        }
      } else {
        console.log('>> loading-path:', this.router.url);
        console.log('>> UNKNOWN BROWSER EVENT, send them to home page');
        this.appEventModel = this.doTransition(this.appDataStore, AppEvent.unknown, AppState.UNKNOWN);
      }
    } else {
      console.log('>> empty path: ', this.router.url);
    }
  }

  ngOnInit(): void { }

  protected doTransition(appDataStore: AppDataStoreService, appEvent: AppEvent, appState: AppState, appData?: AppData): AppEventModel {
    let appEventModel = new AppEventModel();
    // if the appState and appEvent correspond to that configured then invoke the process
    if (StateEventToPathConfig[appState + '_' + appEvent]) {
      appEventModel.appEvent = appEvent;
      appEventModel.appState = appState;
      appEventModel.appData = appData ? appData : new AppData();
      // store the transition data so it an be used to restore a previous 
      // if the user happens to enter the browser's Back button
      console.log('>> preTransData: ', { appEvent, appState, appData: appData ? appData : new AppData() });
      // appDataStore.setPreTrnsitonData(appEventModel);
      appDataStore.setPreTrnsitonData({ appEvent, appState, appData: appData ? appData : new AppData() });
      const path = StateEventToPathConfig[appState + '_' + appEvent];
      const appEventModelRes = PreEventToProcessConfig[appEventModel.appEvent]['process'](appEventModel, appDataStore);
      appDataStore.setCurrentState(appEventModelRes.appState);

      if (appEventModel.appEvent.toString().endsWith("_error")) {
        this.router.navigate(['/error'], { state: { trsnData: appEventModelRes } });
      } else {
        console.log('>> navigating to: ', path, appDataStore.getPreTrnsitonData());
        // this.router.navigate([path], { state: { trsnData: {appEvent, appState, appData} }});
        this.router.navigate([path], { state: { trsnData: appDataStore.getPreTrnsitonData() } });
      }
    } else {
      this.router.navigate(['/**']);
    }
    return appEventModel;
  }
}
