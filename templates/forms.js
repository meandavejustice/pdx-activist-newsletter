var h = require('hyperscript');

module.exports = {
  login: login,
  signup: signup
}

function signup() {
  return h('form', {method: "POST", action: "/signup"},
           h('input', {type: "email", name: "email", required: true, placeholder: "your email address"}),
           h('button', {type: "submit", className: "pas btn btn--black btn--black:hover"}, "SUBMIT"));
}

function login() {
  return h('form', {method: "POST", action: "/login"},
           h('input', {type: "email", name: "email", required: true, placeholder: "email address"}),
           h('input', {type: "password", name: "password", required: true, placeholder: "password"}),
           h('button', {type: "submit", className: "pas btn btn--black btn--black:hover"}, "SUBMIT"));
}
