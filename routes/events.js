var qs = require('querystring');
var sendHTML = require('send-data/html');
var baseTmp = require('../templates/base');
var eventsTmp = require('../templates/events');
var orm = require('../lib/orm');

module.exports = function(req, res, opts) {
  var org = qs.unescape(opts.params.org);
  console.log(opts, '\n')
  orm.events(org, function(err, data) {
    console.log('ERROR:: ', err, '\n')
    console.log('ORGANIZATION::', org, '\n')
    console.log('DATA: ', data, '\n')
    sendHTML(req, res, baseTmp(eventsTmp(org, data)).outerHTML);
  })
}
