import { AppData } from "../../state-transitions-config/app-data.model";
import { AppEventModel } from "../../state-transitions-config/app-event.model";
import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppState } from "../../state-transitions-config/app-states.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";

/**
 * This function supports the following state transitions
 * 
 * HOMEVIEW      -> products -> processProducts() -> products_success -> PRODUCTSVIEW
 * PRODUCTVIEW   -> products -> processProducts() -> products_success -> PRODUCTSVIEW
 * 
 * Also pre-fetches data for the view.
 * 
 * TODO: Need to add new transitions for error events like products_error
 * 
*/
export function productsProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService):
        AppEventModel {
        appDataStore.loadProducts();
        appEventModel.appEvent = AppEvent.products_success;
        appEventModel.appState = AppState.PRODUCTSVIEW;
        return appEventModel;
}