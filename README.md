# A Smart Component for Angular Projects

This project has an implementation of the Smart Component/Dumb Component UI pattern. The smart component in this project has the following features:

1. Enables activating view transitions based on pre-configured rigorous rules like - From State and When Event Then Transition.
2. Provides CanActivate, CanLoad and resolve like features in one central location instead of needing to specify for each path in app-routing.module.ts.
3. Simplifies creating unit test and e2e test scripts.
4. Browser back button navigation and bookmarked intermediate application URL navigation are disabled by default but
   can be supported by explicitly configuring.

The development workflow to use this component in an Angular project are:

1. Configure all the supported view transitions in [state-transitions.config.ts](https://github.com/mapteb/smart-component-for-angular-projects/blob/main/src/app/state-transitions-config/state-transitions.config.ts)
2. Add one process function for each view (like [product.process.ts](https://github.com/mapteb/smart-component-for-angular-projects/blob/main/src/app/product/product/product.process.ts), [products.process.ts](https://github.com/mapteb/smart-component-for-angular-projects/blob/main/src/app/product/products/products.process.ts) etc.)
3. Add view components and extend them from the smart component ([base.component.ts](https://github.com/mapteb/smart-component-for-angular-projects/blob/main/src/app/base/base.component.ts))

Usage of this smart component for a small project can be viewed in [StackBlitz](https://stackblitz.com/edit/angular-ivy-glvqom?file=README.md)

A demo of the running application can be viewed [here](https://mapteb.github.io/smart-component-for-angular-projects/home).

Unit tests can be run using the "ng test" command and e2e integration tests can be run using the command "ng e2e".