/// <reference path='../references.d.ts' />
import plat = require('platypus');
import LoginViewControl = require('../viewcontrols/auth/login.viewcontrol');
import AddBillViewControl = require('../viewcontrols/addbill/addbill.viewcontrol');
import BillsViewControl = require('../viewcontrols/bills/bills.viewcontrol');
import AddPaymentViewControl = require('../viewcontrols/payments/addpayment.viewcontrol');

class App extends plat.App {
    /**
     * Class for every app. This class contains hooks for Application Lifecycle Events
     * as well as error handling and navigation events.
     */
    constructor(router: plat.routing.Router) {
        super();

        router.configure([
            { pattern: '', view: LoginViewControl },
            { pattern: '/bills', view: BillsViewControl },
            { pattern: '/bills/add', view: AddBillViewControl },
            { pattern: '/payments/add/:id', view: AddPaymentViewControl }
        ]);
    }

    ready(ev: plat.events.LifecycleEvent) {
        // can be used to configure various 
        // settings prior to loading the 
        // rest of the application
        console.log('App is ready!');
    }

    error(ev: plat.events.ErrorEvent<Error>) {
        // log or handle errors at a global level
        alert(ev.error);
        console.log(ev.error);
    }

    suspend(ev: plat.events.LifecycleEvent) {
        // if running on a device,
        // this is where you want to save important 
        // data and finish ongoing processes.
    }
    
    resume(ev: plat.events.LifecycleEvent) {
        // if running on a device,
        // this is where you want to re-initialize 
        // the app state.
        // this is called only when the app was 
        // previously suspended.
    }
}

plat.register.app('ibills', App, [plat.routing.Router]);

export = App;