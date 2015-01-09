/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');
import AzureMobileServices = require('../../injectables/azurems.injectable');
import Navbar = require('../../templatecontrols/navbar/navbar.templatecontrol');
import BillsViewControl = require('../bills/bills.viewcontrol');
declare var WindowsAzure: any;

class LoginViewControl extends BaseViewControl {
    templateUrl = './viewcontrols/auth/login.viewcontrol.html';
    context = {
        title: 'iBills Login'
    };
    client: any;
    constructor(azure: AzureMobileServices, public navbar: Navbar){
    	super();
    	this.client = azure.client;
    }
    navigatedTo(){
        this.navbar.visible(false);
    }
    loaded() {
        //super.loaded();
    }
    login() {
		this.client.login("facebook").then(
			() => {
				this.navigator.navigate(BillsViewControl);
			},
			function(error){
        		alert(error);
    		}
    	);
    }
}

export = LoginViewControl;

plat.register.viewControl('loginViewControl', 
    LoginViewControl, 
    [AzureMobileServices, Navbar]
);