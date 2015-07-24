var qs = require('querystring');
var orm = require('../lib/orm');
var sendJSON = require('send-data/json');

module.exports = function (req, res, opts) {
  orm.events(qs.unescape(opts.params.org), function(err, events) {
    if (err) console.error(err);
    sendJSON(req, res, events);
  })
}
