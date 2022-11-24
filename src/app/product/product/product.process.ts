import { AppData } from "src/app/state-transitions-config/app-data.model";
import { AppEventModel } from "src/app/state-transitions-config/app-event.model";
import { AppEvent } from "src/app/state-transitions-config/app-events.enum";
import { AppState } from "src/app/state-transitions-config/app-states.enum";
import { AppDataStoreService } from "src/app/state-transitions-config/app-data-store.service";

/**
 * Implements the following state transition:
 * 
 *   PRODUCTSVIEW  -> product  -> processProduct()  -> product_success  -> PRODUCTVIEW
 * 
 * Also prepares data for the view.
 * 
 * TODO: need to ad a new transition for product_error
 * 
 * @param appEventModel 
 * @param appDataStore 
 * @returns AppEventModel
 */
export function productProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService):
        AppEventModel {
        if (appEventModel.appData?.product.id &&
                appEventModel.appData.product.id > 0) {
                appDataStore.loadProduct(appEventModel.appData.product.id);
                appEventModel.appEvent = AppEvent.product_success;
                appEventModel.appState = AppState.PRODUCTVIEW;
        }
        return appEventModel;
}