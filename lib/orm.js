var levelup = require('level');
var db = levelup('../eventsDb', {valueEncoding: 'json'});
var cachedOrgs = [];
getOrgs(console.log);

function getOrgs(cb) {
  db.get('orgs', function(err, orgs) {
    if (err) return cb(err);
    cachedOrgs = orgs.map(function(org) {
                   return org.substr(org.indexOf('!')+1);
                 })
    return cb(null, cachedOrgs);
  })
}

function getOrg(org, cb) {
  if (!~cachedOrgs.indexOf(org)) return cb('Invalid Organization');

  db.get('orgs!'+org, function(err, detail) {
    if (err) return cb(err);
    return cb(null, detail);
  })
}

function events(org, cb) {
  getOrg(org, function(err, detail) {
    if (err) return cb(err);
    return cb(null, detail.events);
  })
}

module.exports = {
  org: getOrg,
  orgs: getOrgs,
  events: events
};
