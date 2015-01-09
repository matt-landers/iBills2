/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import maintc = require('../../templatecontrols/main/main.templatecontrol');

class BaseViewControl extends plat.ui.WebViewControl {
    window = plat.acquire(plat.Window);
	$utils = plat.acquire(plat.IUtils);
    drawerNavigationRemover: plat.IRemoveListener = () => {};
    loaded(){
        this.setDrawerNavigation();
    }
    setDrawerNavigation() {
        this.drawerNavigationRemover();
        this.drawerNavigationRemover = this.on('drawerNavigation', (ev: plat.events.IDispatchEventInstance, params) => {
            this.navigator.navigate(params.view);
        });
    }
    setTemplate() {
        setTimeout(() => {
            this.window.scrollTo(null, 0);
        }, 10);
    }
}

export = BaseViewControl;