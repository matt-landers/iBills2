/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');
import AzureMobileServices = require('../../injectables/azurems.injectable');
declare var WindowsAzure: any;

export class LoginViewControl extends BaseViewControl {
    templateUrl = './viewcontrols/auth/login.viewcontrol.html';
    context = {
        title: 'iBills Login'
    };
    client: any;
    navbar = {
        visible: false
    };
    constructor(azure: AzureMobileServices, public browser: plat.web.IBrowser, public bc: plat.web.IBrowserConfig){
    	super();
    	this.client = azure.client;
    }
    loaded() {
        super.loaded();
    }
    login() {
		this.client.login("facebook").then(
			() => {
				this.navigator.navigate('bills');
			}, 
			function(error){
        		alert(error);
    		}
    	);
    }
}

plat.register.viewControl('loginViewControl', 
    LoginViewControl, 
    [AzureMobileServices], 
    ['']
);