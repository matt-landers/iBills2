/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');
import AzureMobileServices = require('../../injectables/azurems.injectable');
import Navbar = require('../../templatecontrols/navbar/navbar.templatecontrol');
import moment = require('moment');

class AddBillViewControl extends BaseViewControl {
    templateUrl = './viewcontrols/addbill/addbill.viewcontrol.html';
    context = {
        title: 'Add Bill',
        name: '',
        billtype: 'other',
        nextduedate: moment().add(1, 'month').format('MM-DD-YYYY'),
        billtypes: ['other', 'car', 'gas', 'electric', 'insurance', 'cable', 'mortgage', 'water', 'creditcard'],
        showBillTypes: false
    };
    client: any;
    payments: any;
    bills: any;
    constructor(azure: AzureMobileServices, public utils: plat.IUtils, public navbar: Navbar){
        super();
        this.client = azure.client;
        console.log('addbill constructor');
    }
    initialize() {
        this.bills = this.client.getTable('bills');
        console.log('addbill initialize');
    }
    loaded() {
        console.log('addbill loaded');
    }
    navigatedTo(){
        console.log('addbill nto');
        this.navbar.title('Add Bill');
        this.navbar.visible(true);
        this.navbar.showDrawer(false);
        this.navbar.rightActionIcon('fa-save');
        this.navbar.rightNavAction2 = this.rightNavAction.bind(this);
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
                name: this.context.name,
                billtype: this.context.billtype,
                nextduedate: new Date(this.context.nextduedate)
            }).then(() => {
                this.navigator.goBack();
            });
    }
}

export = AddBillViewControl;

plat.register.viewControl('addbillViewControl', 
    AddBillViewControl, [AzureMobileServices, plat.IUtils, Navbar]);
