import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";
import { AppEventModel } from "../../state-transitions-config/app-event.model";
import { AppState } from "../../state-transitions-config/app-states.enum";
import { UserRole } from "src/app/state-transitions-config/user-role.enum";


/**
 * This function supports the following state transition:
 * 
 *   PRODUCTSVIEW  -> product  -> processProduct()  -> product_success  -> PRODUCTVIEW
 * 
 * This function also enforces the user role required to process the request. Also
 * pre-fetches data for the view
 * 
 * TODO: need to ad a new transition for product_error
 * 
 * @param appEventModel 
 * @param appDataStore 
 * @returns AppEventModel
 */
export function productProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService):
        AppEventModel {
        console.log(">> processing product request");
        if (appDataStore.getUser().role === UserRole.ADMIN) {
                if (appEventModel.appData?.product.id &&
                        appEventModel.appData.product.id > 0) {
                        appDataStore.loadProduct(appEventModel.appData.product.id);
                        appEventModel.appEvent = AppEvent.product_success;
                        appEventModel.appState = AppState.PRODUCTVIEW;
                }
        } else {
                // TODO: handle authorization error
                appEventModel.appEvent = AppEvent.unknown;
                appEventModel.appState = AppState.UNKNOWN;
        }
        return appEventModel;
}