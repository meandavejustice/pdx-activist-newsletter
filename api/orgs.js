var qs = require('querystring');
var orm = require('../lib/orm');
var sendJSON = require('send-data/json');

module.exports = function (req, res, opts) {
  if (opts.params.org) {
    orm.org(qs.unescape(opts.params.org), function(err, orgs) {
      if (err) console.error(err);
      sendJSON(req, res, orgs);
    })
  } else {
    orm.orgs(function(err, orgs) {
      if (err) console.error(err);
      sendJSON(req, res, orgs);
    })
  }
}
