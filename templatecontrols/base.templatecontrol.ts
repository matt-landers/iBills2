/// <reference path="../references.d.ts" />
import plat = require('platypus');

class BaseTemplateControl extends plat.ui.TemplateControl {
	$utils = plat.acquire(plat.IUtils);
}

export = BaseTemplateControl