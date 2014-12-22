/// <reference path="../references.d.ts" />
import plat = require('platypus');
var moment = require('moment');

export class Moment {
    formatDate(datetime: string, format: string) {
        return moment(datetime).format(format);
    }
}

plat.register.injectable('moment', Moment);
