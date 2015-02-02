/// <reference path="../../references.d.ts" />
import plat = require('platypus');

class BaseViewControl extends plat.ui.ViewControl {
    window = plat.acquire(plat.Window);
	$utils: plat.Utils = plat.acquire(plat.Utils);
    setTemplate() {
        setTimeout(() => {
            this.window.scrollTo(null, 0);
        }, 10);
    }
}

export = BaseViewControl;