var h = require('hyperscript');

module.exports = function(user) {
  return h('h3', "Thanks for signing up, "+user+"!");
}