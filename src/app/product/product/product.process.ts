import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";
import { AppEventModel } from "../../state-transitions-config/app-event.model";
import { AppState } from "../../state-transitions-config/app-states.enum";


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