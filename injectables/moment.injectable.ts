/// <reference path="../references.d.ts" />
import plat = require('platypus');
var moment = require('moment');

export class Moment {
    formatDate(datetime: string, format: string) {
        return moment(datetime).format(format);
    }
    getBillUrgency(datetime: string){
    	var nextduedate = moment(datetime);
    	var days = nextduedate.diff(Date.now(), 'days');
    	if(days <= 0){
    		return 'due';
    	} else if(days <= 7) {
    		return 'soon';
    	} else {
    		return 'paid';
    	}
    }
}

plat.register.injectable('moment', Moment);
