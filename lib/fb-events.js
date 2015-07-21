var FB = require('fb');
var async = require('async');
var levelup = require('level');
var db = levelup('../db', {valueEncoding: 'json'});

FB.api('oauth/access_token', require('../config'), function (res) {
  if (!res || res.error) {
    console.log('error getting access token');
    process.exit();
  }

  FB.setAccessToken(res.access_token);
  getEntriesForOrgs(require('../orgs'));
});

function getEntriesForOrgs(orgs) {
  async.map(orgs, getEntryForOrg, function(err, entries) {
    // console.log(JSON.stringify(entries, null, 2));
    var ops = entries.map(function(e) {
                return {type: 'put', key: 'orgs!' + e.name, value: e}
              });

    db.batch(ops, function (err) {
      if (err) return console.log('Error during batch write of entries', err);
      var orgKeys = ops.map(function(op) {return op.key;});
      console.log('Wrote entries for ', orgKeys);
      db.put('orgs', orgKeys, function(err) {
        if (err) return console.log('Error writing orgs index', err);
        console.log('Wrote orgs index');
      });
    });
  });
}

function getEntryForOrg(org, cb) {
  var entry;
  req(org, function(err, res) {
    entry = res;
    if (res === undefined) {
      console.log(org + ' failed');
      return;
    }
    getFutureEvents(res.id, function(err, ids) {
      async.map(ids, getEventDetails, function(err, results){
        entry.events = results;
        cb(null, entry);
      });
    })
  });
}

function getFutureEvents(pageId, cb) {
  req(pageId+'/events', function(err, res) {
    cb(null, res.data.filter(function(ev) {
               return new Date(ev.start_time) > new Date();
             }).map(function(ev) {
               return ev.id;
             }));
  })
}

function getEventDetails(eventId, cb) {
  var event;
  req(eventId, function(err, data) {
    event = data;
    req(eventId+'/photos', function(err, data) {
      event.photos = data;
      cb(null, event);
    });
  })
}

function req(q, cb) {
  FB.api(q, function (res) {
    if(!res || res.error) {
      cb(res.error);
      console.log(!res ? 'error occurred' : res.error, 'query:: ', q);
      return;
    }
    cb(null, res)
  });
}
