var sendHTML = require('send-data/html');
var baseTmp = require('../templates/base');
var eventTmp = require('../templates/event-detail');
var orm = require('../lib/orm');

module.exports = function(req, res, opts) {
  // temporary data fetch
  var q = 'Portland ABC';
  if (opts.params.id) q = opts.params.id;
  orm.events(q, function(err, data) {
    sendHTML(req, res, baseTmp(eventTmp(data[0])).outerHTML);
  })
}
