/// <reference path="../../references.d.ts" />
import plat = require('platypus');
import maintc = require('../../templatecontrols/main/main.templatecontrol');
import INavbarContext = require('../../templatecontrols/navbar/INavbarContext');

class BaseViewControl extends plat.ui.WebViewControl {
    window = plat.acquire(plat.Window);
	$utils = plat.acquire(plat.IUtils);
	navbar: INavbarContext;
    mainControl: maintc.Main;
    drawerNavigationRemover: plat.IRemoveListener = () => {};
    loaded(){
    	this.mainControl = <maintc.Main>this.root.parent.parent;
        this.setNavbarContext();
        this.setDrawerNavigation();
    }
    setNavbarContext() {
        var navbar = this.$utils.clone(this.navbar, true);
        this.mainControl.setNavbarContext(navbar);
    }
    setDrawerNavigation() {
        this.drawerNavigationRemover();
        this.drawerNavigationRemover = this.on('drawerNavigation', (ev: plat.events.IDispatchEventInstance, params) => {
            this.navigator.navigate(params.view);
        });
    }
    back() {
    	console.log('back clicked');
        this.navigator.goBack();
    }
    rightNavAction() {}
    leftNavAction() {}
    setTemplate() {
        setTimeout(() => {
            this.window.scrollTo(null, 0);
        }, 10);
    }
}

export = BaseViewControl;