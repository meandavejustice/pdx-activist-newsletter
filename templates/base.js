var h = require('hyperscript');

module.exports = function(child) {
  return h('html',
           h('head',
             h('link', {rel: "stylesheet", href:"css/tachyons.min.css", type:"text/css", media:"screen"}),
             h('link', {rel: "stylesheet", href:"css/style.css", type:"text/css", media:"screen"}),
             h('link', {rel: "stylesheet", href:"http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"}),
             h("meta", {"charset":"utf-8"}),
             h('meta', {name: "viewport", content: "width=device-width, initial-scale=1"})),
           h('body', {className: "wi-100"},
             h('header', {className: "bb b--light-gray pvm"},
               h('div', {className: "center mw8 phm phl-ns"},
                 h('h1', {className: "f3 book dib prm"},
                   h('a', {className: "link", href:"/", title: "home"}, "PDX Activist Newsletter")),
                 h('h2', {className: "f4 book orange dib"},
                   h('i', "")))),
             h('main', {className: "center mw8 phm phl-ns pbxl"},
               h('div', {className: "pas"},
                 (child),
                 h('script', {type: "text/javascript", src: "bundle.js"})))));
}
