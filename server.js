var http = require('http');
var path = require('path');
var qs = require('querystring');
var st = require("st");
var Busboy = require('busboy');
var Router = require('http-hash-router');
var sendHTML = require('send-data/html');
var sendJSON = require('send-data/json');

var confirmTmp = require('./templates/confirm');
var formTmps = require('./templates/forms');
var baseTmp = require('./templates/base');

var inspect = require('util').inspect;

var router = Router();
var port = 8000;

var staticHandler = st({
  path: __dirname + '/public',
  cache: false
});

router.set("/settings/:user", function(req, res, opts) {
  console.log(opts);
  console.log(qs.parse(req.url));
  // redirect(req, res, '')
})

router.set("/confirm/:user/:token", function(req, res, opts) {
  console.log('user:', opts.params.user);
  console.log('token:', opts.params.token);
  sendHTML(req, res, baseTmp(confirmTmp(opts.params.user)).outerHTML);
})

router.set("/signup", function(req, res) {
  var busboy = new Busboy({headers: req.headers});
  var email = '';
  busboy.on('field', function(fieldname, val) {
    if (fieldname === 'email') {
      email = val;
      sendConfirmation(val);
    }
  });
  busboy.on('finish', function() {
    res.writeHead(302, { Connection: 'close', Location: '/confirm' });
    res.end();
  });
  req.pipe(busboy);
})

router.set("/", function(req, res) {
  sendHTML(req, res, baseTmp(formTmps.signup()).outerHTML);
})

router.set("*", function(req, res) {
  staticHandler(req, res);
})

var server = http.createServer(function handler(req, res) {
  router(req, res, {}, onErr);

  function onErr(err) {
    if (err) {
      res.statusCode = err.statusCode || 500;
      res.end(err.message);
    }
  }
});
server.listen(port);

console.log("Server listening on port: ", port);

function redirect(req, res, path) {
  res.writeHead(302, {
    'Location': path
  });
  res.end();
}
