/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');
import AzureMobileServices = require('../../injectables/azurems.injectable');
import Navbar = require('../../templatecontrols/navbar/navbar.templatecontrol');
import moment = require('moment');

class AddPaymentViewControl extends BaseViewControl {
    templateUrl = './viewcontrols/payments/addpayment.viewcontrol.html';
    context = {
        title: 'Add Payment',
        amount: 0.00,
        datepaid: moment().format('MM-DD-YYYY'),
        nextduedate: moment().add(1, 'month').format('MM-DD-YYYY')
    };
    client: any;
    payments: any;
    bills: any;
    billid: number;
    constructor(azure: AzureMobileServices, public utils: plat.IUtils, public navbar: Navbar){
        super();
        console.log('addpayment constructor');
        this.client = azure.client;
    }
    initialize() {
        this.payments = this.client.getTable('payments');
        this.bills = this.client.getTable('bills');
    }
    navigatedTo(parameters: { id: number; }){
        console.log('addpayment navigatedto');
        this.billid = parameters.id;
        this.navbar.title('Add Payment');
        this.navbar.showDrawer(false);
        this.navbar.rightActionIcon('fa-save');
        this.navbar.visible(true);
        var test = this.navbar.rightNavAction;
        this.navbar.rightNavAction2 = this.rightNavAction.bind(this);
        console.log(this.navbar.rightNavAction === test);
        console.log('addpayment navigatedto end');
    }
    rightNavAction(){
        this.addpayment();
    }
    addpayment(){
        alert('adding payment');
        this.payments.insert(
            { 
                billid: this.billid,
                amountpaid: this.context.amount,
                datepaid: new Date(this.context.datepaid)
            }).then(() => {
                alert('payment added updating bill');
                this.bills.update(
                    {
                        id: this.billid, 
                        nextduedate: new Date(this.context.nextduedate) 
                    })
            }).then(() => {
                alert('bill updated.  nagivating back');
                this.navigator.goBack();
            });
    }
}

export = AddPaymentViewControl;

plat.register.viewControl('addpaymentViewControl', 
    AddPaymentViewControl, 
    [AzureMobileServices, plat.IUtils, Navbar]);