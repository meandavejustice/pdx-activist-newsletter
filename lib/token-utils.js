var crypto = require('crypto');
var base58 = require('bs58');

function getConfirmDate() {
  var now = new Date();
  return now.setMinutes(now.getMinutes() + 10);
}

function getTokenDate() {
  var now = new Date();
  return now.setFullYear(now.getFullYear() + 1);
}

function generateToken(randomBytes) {
	randomBytes = randomBytes || 16;
	var buf = crypto.randomBytes(randomBytes);
	return base58.encode(buf);
}

module.exports = {
  getConfirmDate: getConfirmDate,
  getTokenDate: getTokenDate,
  generateToken: generateToken
}
