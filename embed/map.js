// embed/map/?lat=45.517393&lon=-122.660160&zoom=16&title=Mother%20Foucault%27s
var url = require('url');
var qs = require('querystring');
var sendHTML = require('send-data/html');
var mapTmp = require('../templates/embed-map');
var xtend = require('xtend');
var config = require('../config');

module.exports = function(req, res) {
  var q = xtend({
    zoom: 16,
    lat: 45.5234515,
    lon: -122.6762071,
    title: 'Portland, Oregon',
    width: '600px',
    height: '400px',
    mapbox_access: config.mapbox_access
  }, qs.parse(url.parse(req.url).query));

  sendHTML(req, res, mapTmp(q).outerHTML);
}
