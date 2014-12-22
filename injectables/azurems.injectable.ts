/// <reference path="../references.d.ts" />
import plat = require('platypus');
declare var WindowsAzure : any;

class AzureMobileServices {
	client: any;
	constructor() {
		this.client = new WindowsAzure.MobileServiceClient('https://billtracker.azure-mobile.net/', 'LCPVVjxNKyaIaSLIzNdxFaKTJqIkSB34');	
	}
}

plat.register.injectable('azure', AzureMobileServices);

export = AzureMobileServices;