
/**
 * All the events handled by the application are included in this enum.
 * 
 * Events like home_error, products_error can be
 * included here when needed
 */
export enum AppEvent {
    home = "home",
    home_success = "home_success",
    products = "products",
    products_success = "products_success",
    product = "product",
    product_success = "product_success",
    unknown = "unknown"
}
