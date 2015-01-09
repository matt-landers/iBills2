/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseTemplateControl = require('../base.templatecontrol');

export class Main extends BaseTemplateControl {
	viewcontrol: any;
	context = {
		navbar: <interfaces.INavbarContext>{},
		photos: [
			'./assets/icons/checking.png',
			'./assets/icons/credit.png',
			'./assets/icons/moneymarket.png',
			'./assets/icons/savings.png',
			'./assets/icons/brokerage.png'
		]
	};

	createAccount: plat.controls.INamedElement<any, any>;

	constructor() {
		super();
		this.on('navigated', (ev: plat.events.INavigationEvent<any>) => {
			this.viewcontrol = ev.target;
		});
	}

	setNavbarContext(details: interfaces.INavbarContext) {
		//this.context.navbar = details;
	}
}

plat.register.control('main', Main);
