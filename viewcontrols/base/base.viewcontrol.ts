/// <reference path="../../references.d.ts" />
import plat = require('platypus');

class BaseViewControl extends plat.ui.WebViewControl {
    window = plat.acquire(plat.Window);

    setTemplate() {
        setTimeout(() => {
            this.window.scrollTo(null, 0);
        }, 10);
    }
}

export = BaseViewControl;