/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');
import AzureMobileServices = require('../../injectables/azurems.injectable')

export class BillsViewControl extends BaseViewControl {
    templateUrl = './viewcontrols/bills/bills.viewcontrol.html';
    context = {
        title: 'My Bills',
        bills: []
    };
    client: any;
    bills: any;
    navbar = {
        visible: true,
        title: 'Bills',
        toggleMenu: true,
        rightActionIcon: 'fa-plus'
    };
    constructor(azure: AzureMobileServices, public utils: plat.IUtils){
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
        this.refreshBills();
    }
    rightNavAction(){
        this.navigator.navigate('/bills/add');
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
            console.log(bills);
            this.context.bills = bills;
        });
    }
    paybill(id: any){
        this.navigator.navigate('/payments/add/' + id);
    }
}

plat.register.viewControl('billsViewControl', BillsViewControl, [AzureMobileServices, plat.IUtils], ['/bills']);