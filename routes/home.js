var sendHTML = require('send-data/html');
var auth = require('../lib/auth');
var baseTmp = require('../templates/base');
var formTmps = require('../templates/forms');

module.exports = function(req, res, opts) {
  auth.verifyToken(opts.cookies.user, opts.cookies.token, function() {
    res.end("holy fuck: "+opts.cookies.token+' '+opts.cookies.user);
  }, function() {
       sendHTML(req, res, baseTmp(formTmps.signup()).outerHTML);
     })
}
