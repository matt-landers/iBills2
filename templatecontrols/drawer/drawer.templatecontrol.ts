/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseTemplateControl = require('../base.templatecontrol');

class Drawer extends BaseTemplateControl {
	templateUrl = 'templatecontrols/drawer/drawer.templatecontrol.html';

	context = {
		visible: false
	};

	dispatchNavigation(view: string) {
		this.context.visible = false;
		this.dispatchEvent('drawerNavigation', plat.events.EventManager.DIRECT, {
			view: view
		});
	}
}

interface IDrawerContext {
	visible: boolean;
}

export = Drawer;

plat.register.control('drawer', Drawer, null, true);