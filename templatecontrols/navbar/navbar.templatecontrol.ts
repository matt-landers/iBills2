/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseTemplateControl = require('../base.templatecontrol');

class Navbar extends BaseTemplateControl {
	templateUrl = 'templatecontrols/navbar/navbar.templatecontrol.html';
	replaceWith = 'nav';
	hasOwnContext = true;
	context: interfaces.INavbarContext  = {
		visible: false,
		title: '',
		rightActionIcon: '',
		showDrawer: false
	};
	constructor(public navigator: plat.routing.Navigator){
		super();
	}
	visible(show: boolean){
		this.context.visible = show;
	}
	title(title: string){
		this.context.title = title;
	}
	showDrawer(show: boolean){
		this.context.showDrawer = show;
	}
	rightActionIcon(icon: string){
		this.context.rightActionIcon = icon;
	}
	leftNavAction(){
		this.navigator.goBack();
	}
	rightNavAction(){
		this.rightNavAction2();
	}
	rightNavAction2(){}
}

export = Navbar;

plat.register.control('navbar', Navbar, [plat.routing.INavigatorInstance], true);