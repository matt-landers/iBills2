/// <reference path="references.d.ts" />

/*
 * All injectables, template/view controls and any js files that will not be imported
 * by another module will need to be required here
 */

//platypus
require('platypus');
require('./lib/platypusui/platypusui');
// app
require('./app/app');

// injectables
require('./injectables/azurems.injectable');
require('./injectables/moment.injectable');

// template controls
require('./templatecontrols/base.templatecontrol');
require('./templatecontrols/drawer/drawer.templatecontrol');
require('./templatecontrols/navbar/navbar.templatecontrol');
// app view controls
require('./viewcontrols/base/base.viewcontrol');
require('./viewcontrols/auth/login.viewcontrol');
require('./viewcontrols/bills/bills.viewcontrol');
require('./viewcontrols/payments/addpayment.viewcontrol');
require('./viewcontrols/addbill/addbill.viewcontrol');