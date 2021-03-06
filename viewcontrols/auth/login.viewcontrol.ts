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
    constructor(azure: AzureMobileServices){
    	super();
    	this.client = azure.client;
    }
    loaded() {
    	console.log('login loaded');
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

plat.register.viewControl('loginViewControl', LoginViewControl, [AzureMobileServices], ['/']);