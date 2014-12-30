/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseTemplateControl = require('../base.templatecontrol');
import INavbarContext = require('../navbar/inavbarcontext');

export class Main extends BaseTemplateControl {
	viewcontrol: any;
	context = {
		navbar: <INavbarContext>{},
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

	setNavbarContext(details: INavbarContext) {
		this.context.navbar = details;
	}
	back(){
		this.viewcontrol.back();
	}
	rightNavAction() {
		this.viewcontrol.rightNavAction();
	}

	openModal() {
		this.createAccount.control.show();
	}

	closeModal() {
		this.createAccount.control.show();	
	}
}

plat.register.control('main', Main);
