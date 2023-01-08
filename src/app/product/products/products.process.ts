import { AppData } from "../../state-transitions-config/app-data.model";
import { AppEventModel } from "../../state-transitions-config/app-event.model";
import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppState } from "../../state-transitions-config/app-states.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";
import { UserRole } from "src/app/state-transitions-config/user-role.enum";

/**
 * This function supports the following state transitions
 * 
 * HOMEVIEW      -> products -> processProducts() -> products_success -> PRODUCTSVIEW
 * PRODUCTVIEW   -> products -> processProducts() -> products_success -> PRODUCTSVIEW
 * 
 * This function also enforces the user role required to process the request 
 * Also pre-fetches data for the view.
 * 
 * TODO: Need to add new transitions for error events like products_error
 * 
*/
export function productsProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService):
        AppEventModel {
        console.log(">> processing products request");
        if (appDataStore.getUser().role! >= UserRole.USER) {
                appDataStore.loadProducts();
                appEventModel.appEvent = AppEvent.products_success;
                appEventModel.appState = AppState.PRODUCTSVIEW;
        } else {
                // TODO: handle authorization error
        }
        return appEventModel;
}