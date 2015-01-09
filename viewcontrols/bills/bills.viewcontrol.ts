/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');
import AzureMobileServices = require('../../injectables/azurems.injectable');
import Navbar = require('../../templatecontrols/navbar/navbar.templatecontrol');
import AddBillViewControl = require('../addbill/addbill.viewcontrol');
import AddPaymentViewControl = require('../payments/addpayment.viewcontrol');

class BillsViewControl extends BaseViewControl {
    templateUrl = './viewcontrols/bills/bills.viewcontrol.html';
    context = {
        title: 'My Bills',
        bills: []
    };
    client: any;
    bills: any;
    constructor(azure: AzureMobileServices, public utils: plat.IUtils, public navbar: Navbar){
        super();
        this.client = azure.client;
    }
    initialize() {
        this.bills = this.client.getTable('bills');
    }
    loaded(){
        super.loaded();
    }
    navigatedTo(){
        console.log('bills nto');
        this.navbar.visible(true);
        this.navbar.title('Bills');
        this.navbar.showDrawer(true);
        this.navbar.rightActionIcon('fa-plus');
        this.navbar.rightNavAction2 = this.rightNavAction.bind(this);
        this.refreshBills();
    }
    rightNavAction(){
        this.navigator.navigate(AddBillViewControl);
    }
    refreshBills(){
        this.bills.read().then((bills)=>{
            bills.sort(function(a,b){
                if(a.nextduedate > b.nextduedate){
                    return 1;
                }
                if(a.nextduedate < b.nextduedate){
                    return -1;
                }
                return 0;
                });
            this.context.bills = bills;
        });
    }
    paybill(id: any){
        this.navigator.navigate(AddPaymentViewControl, { 
            parameters: {
             id: id
            }
        });
    }
}

export = BillsViewControl;

plat.register.viewControl('billsViewControl', BillsViewControl, [AzureMobileServices, plat.IUtils, Navbar]);