import { homeProcess } from '../home/home.process';
import { productProcess } from '../product/product/product.process';
import { productsProcess } from '../product/products/products.process';
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
 *
 * TODO: To support a login process a transition like below can be added
 * UNKNOWN      -> login    -> processLogin()    -> login_success    -> HOMEVIEW       
 * 
 * TODO: To support a bookmarked applicationn URL like /products a transition like below can be added
 * UNKNOWN      -> products  -> processProducts()   -> products_success  -> PRODUCTSVIEW   
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

/**
 * TODO: configures the transition paths to error conditions like
 * products_error, product_error etc.
 * 
 *  export const ErrorStateEventToPathConfig = {
        AppEvent.PRODUCTSERRORVIEW: '/products_error',
        AppEvent.PRODUCTERRORVIEW: '/product_error',
    } as IStateEventDictionary<string>
 *  
 */
