/// <reference path="../references.d.ts" />
import plat = require('platypus');

class BaseTemplateControl extends plat.ui.TemplateControl {
	$utils: plat.Utils = plat.acquire(plat.Utils);
}

export = BaseTemplateControl