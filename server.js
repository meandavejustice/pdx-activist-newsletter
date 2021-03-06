var http = require('http');
var Router = require('http-hash-router');
var Cookies = require('cookies');

var config = require('./config.json');

var home = require('./routes/home');
var accounts = require('./routes/accounts');
var settings = require('./routes/settings');

var orgs = require('./api/orgs');
var events = require('./api/events');

var router = Router();

router.set("/sent", accounts.sent)
router.set("/signup", accounts.signup)
router.set("/confirm/:user/:token", accounts.confirm)
router.set("/settings/:user", settings)

router.set("/api/orgs", orgs)
router.set("/api/orgs/:org", orgs)
router.set("/api/events/:org", events)

router.set("/", home)

router.set("*", require("st")({
  path: __dirname + '/public',
  cache: false
}))

http.createServer(function handler(req, res) {
  var cookies = Cookies(req, res);
  router(req, res, {
    cookies: {
      user: cookies.get('user'),
      token: cookies.get('token')
    }
  }, onErr);

  function onErr(err) {
    if (err) {
      res.statusCode = err.statusCode || 500;
      res.end(err.message);
    }
  }
}).listen(config.port);

console.log('Server running on port: ', config.port);