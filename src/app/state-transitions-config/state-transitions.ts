import { homeProcess } from '../home/home.process';
import { productProcess } from '../product/product/product.process';
import { productsProcess } from '../product/products/products.process';
import { AppDataStoreService } from '../state-transitions-manager/app-data-store.service';
import { AppData } from './app-data.model';
import { AppEventModel } from './app-event.model';
import { AppEvent } from './app-events.enum';
import { AppState } from './app-states.enum';

/**
 * The following state transitions correspond to the SPA tht we need to develop
 * The five columns are: Initial State, pre-event, process, post-event and final state
 * State Transitions corresponding to eror events like products_error are not considered
 * here but can be easily added as aditional transitions
 * 
  UNKNOWN       -> home     -> processHome()     -> home_success     -> HOMEVIEW
  HOMEVIEW      -> products -> processProducts() -> products_success -> PRODUCTSVIEW
  --
  PRODUCTSVIEW  -> product  -> processProduct()  -> product_success  -> PRODUCTVIEW
  PRODUCTSVIEW  -> home     -> processHome()     -> home_success     -> HOMEVIEW
  --
  PRODUCTVIEW   -> products -> processProducts() -> products_success -> PRODUCTSVIEW
  PRODUCTVIEW   -> home     -> processHome()     -> home_success     -> HOMEVIEW
 *
*/

/** 
 * This const configures the process that should be triggered when a pre-event is raised.
 * the homeProcess, productsProcess and productProcess are imported functions.
 * These functions pre-fetch data 
 */
export const PreEventToProcessConfig = {
    home: { process: homeProcess },
    products: { process: productsProcess },
    product: { process: productProcess }
} as {[id: string]: {[key: string]: any}}

interface IStateEventDictionary<TValue> {
    [state_event: string]: TValue;
}

/**
 * This const configures the transition rule like
 * From State When Event Then transition to a valid URL 
 */
export const StateEventToPathConfig = {
    [AppState.UNKNOWN + '_' + AppEvent.home]: '/home',
    [AppState.HOMEVIEW + '_' + AppEvent.products]: '/products',
    [AppState.PRODUCTSVIEW + '_' + AppEvent.product]: '/products/product',
    [AppState.PRODUCTVIEW + '_' + AppEvent.products]: '/products',
    [AppState.PRODUCTSVIEW + '_' + AppEvent.home]: '/home',
    [AppState.PRODUCTVIEW + '_' + AppEvent.home]: '/home',
} as IStateEventDictionary<string>