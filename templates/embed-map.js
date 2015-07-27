var h = require('hyperscript');
var JSONGlobals = require('json-globals');
var config = require("../config");

module.exports = function(opts) {
  return h('html',
           h('head',
             h('title', "Map Detail of " +opts.title),
             h('link', {rel: "stylesheet", href:"http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"}),
             h("meta", {"charset":"utf-8"}),
             h("script", {src: "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"}),
             h("script", JSONGlobals(opts)),
             h("style", ["#map {width:"+opts.width+ ";height: "+opts.height+";}"]),
             h('meta', {name: "viewport", content: "width=device-width, initial-scale=1.0"})),
           h('body',
               h('div', {id: "map", style: {
                 width: opts.width, height: opts.height
               }}),
             h('script', {src: config.domain+"/js/map-embed.js"})
            ));
}
