/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import BaseTemplateControl = require('../base.templatecontrol');

export class Navbar extends BaseTemplateControl {
	templateUrl = 'templatecontrols/navbar/navbar.templatecontrol.html';
	replaceWith = 'nav';
}

plat.register.control('navbar', Navbar);