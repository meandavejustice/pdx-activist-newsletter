var levelup = require('levelup')
var Token = require('accountdown-token');
var accountdown = require('accountdown');

var usersDb = accountdown(levelup('/does/not/matter', { db: require('memdown') }), {
  login: {
    token: Token
  }
});

function createUser(user, token, expiry, successCb, errorCb) {
  var opts = {
    login: { token: { username: user, token: token, expiry: expiry } }
  };

  usersDb.create(user, opts, function (err) {
    if (err && errorCb) return errorCb()
    else if (successCb) successCb()
    console.log('user created: ', user);
  });
}

function verifyToken(user, token, successCb, errCb) {
  usersDb.verify('token', { username: user, token: token }, function (err, ok, id) {
    if (err) return errCb()
    if (ok) return successCb()
    else return errCb();
  })
}

module.exports = {
  createUser: createUser,
  verifyToken: verifyToken
}
