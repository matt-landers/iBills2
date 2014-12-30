/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');
import AzureMobileServices = require('../../injectables/azurems.injectable')
import moment = require('moment');

export class AddPaymentViewControl extends BaseViewControl {
    templateUrl = './viewcontrols/payments/addpayment.viewcontrol.html';
    context = {
        title: 'Add Payment',
        amount: 0.00,
        datepaid: moment().format('MM-DD-YYYY'),
        nextduedate: moment().add(1, 'month').format('MM-DD-YYYY')
    };
    navbar = {
        visible: true,
        title: 'Add Payment',
        toggleMenu: false,
        backButton: true,
        rightActionIcon: 'fa-save'
    };
    client: any;
    payments: any;
    bills: any;
    billid: number;
    constructor(azure: AzureMobileServices, public utils: plat.IUtils){
        super();
        this.client = azure.client;
    }
    initialize() {
        this.payments = this.client.getTable('payments');
        this.bills = this.client.getTable('bills');
    }
    loaded() {
        super.loaded();
    }
    navigatedTo(route: plat.web.IRoute<{ id: number; }>){
        this.billid = route.parameters.id;
    }
    rightNavAction(){
        this.addpayment();
    }
    addpayment(){
        this.payments.insert(
            { 
                billid: this.billid,
                amountpaid: this.context.amount,
                datepaid: this.context.datepaid
            }).then(() => {
                this.bills.update(
                    {
                        id: this.billid, 
                        nextduedate: this.context.nextduedate 
                    })
            }).then(() => {
                this.navigator.goBack();
            });
    }
}

plat.register.viewControl('addpaymentViewControl', AddPaymentViewControl, [AzureMobileServices, plat.IUtils], ['/payments/add/:id']);