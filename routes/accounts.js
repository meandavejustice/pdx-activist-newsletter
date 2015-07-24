var Busboy = require('busboy');
var Cookies = require('cookies');
var sendHTML = require('send-data/html');

var auth = require('../lib/auth');
var mailer = require('../lib/mailer');
var redirect = require('../lib/redirect');
var tokenUtils = require('../lib/token-utils');

var baseTmp = require('../templates/base');
var confirmTmp = require('../templates/confirm');

function signup(req, res) {
  var busboy = new Busboy({headers: req.headers});
  busboy.on('field', function(fieldname, val) {
    if (fieldname === 'email') {
      var token = tokenUtils.generateToken();
      auth.createUser(val, token, tokenUtils.getConfirmDate());
      mailer.sendConfirmation(val, token);
    }
  });
  busboy.on('finish', function() {
    redirect(req, res, '/sent');
  });
  req.pipe(busboy);
}

function confirm(req, res, opts) {
  var user = opts.params.user;
  var token = opts.params.token;
  auth.verifyToken(user, token, function success() {
    token = tokenUtils.generateToken();
    auth.createUser(user, token, tokenUtils.getTokenDate())
    var cookies = Cookies(req, res);
    cookies.set("token", token);
    cookies.set("user", user);
    sendHTML(req, res, baseTmp(confirmTmp(opts.params.user)).outerHTML);
  }, function err() {
    res.end("holy fuck: too late to confirm");
  })
}

function sent(req, res, opts) {
  res.end('you have 10 minutes to confirm, check your email.');
}

module.exports = {
  signup: signup,
  confirm: confirm,
  sent: sent
}
