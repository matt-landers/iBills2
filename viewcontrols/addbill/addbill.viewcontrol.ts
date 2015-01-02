/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');
import AzureMobileServices = require('../../injectables/azurems.injectable')
import moment = require('moment');

export class AddBillViewControl extends BaseViewControl {
    templateUrl = './viewcontrols/addbill/addbill.viewcontrol.html';
    context = {
        title: 'Add Bill',
        name: '',
        billtype: 'other',
        nextduedate: moment().add(1, 'month').format('MM-DD-YYYY'),
        billtypes: ['other', 'car', 'gas', 'electric', 'insurance', 'cable', 'mortgage', 'water', 'creditcard'],
        showBillTypes: false
    };
    navbar = {
        visible: true,
        title: 'Add Bill',
        toggleMenu: false,
        backButton: true,
        rightActionIcon: 'fa-save'
    };
    client: any;
    payments: any;
    bills: any;
    constructor(azure: AzureMobileServices, public utils: plat.IUtils){
        super();
        this.client = azure.client;
    }
    initialize() {
        this.bills = this.client.getTable('bills');
    }
    loaded() {
        super.loaded();
    }
    rightNavAction(){
        this.addbill();
    }
    showBillTypeModal(){
        this.context.showBillTypes = true;
    }
    hideBillTypeModal(billtype: any){
        if(this.utils.isString(billtype)){
            this.context.billtype = billtype;
        }
        this.context.showBillTypes = false;
    }
    addbill(){
        this.bills.insert(
            { 
                name: this.name,
                billtype: this.context.billtype,
                nextduedate: this.context.nextduedate
            }).then(() => {
                this.navigator.goBack();
            });
    }
}

plat.register.viewControl('addbillViewControl', AddBillViewControl, [AzureMobileServices, plat.IUtils], ['/bills/add']);
