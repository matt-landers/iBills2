/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseTemplateControl = require('../base.templatecontrol');

class Drawer extends BaseTemplateControl {
	templateUrl = 'templatecontrols/drawer/drawer.templatecontrol.html';

	context = {
		visible: false
	};
    
    constructor(public navigator: plat.routing.Navigator) {
        super();
    }
    
	navigate(view: string) {
		this.context.visible = false;
        console.log(view);
        this.navigator.navigate(view);
	}
}

interface IDrawerContext {
	visible: boolean;
}

export = Drawer;

plat.register.control('drawer', Drawer, [plat.routing.INavigatorInstance], true);