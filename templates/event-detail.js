var h = require('hyperscript');

module.exports = function(event) {
  // get index of first uploaded photo(usually this is the cover photo)
  var imgCount = event.photos.data.length - 1;
  return h('div.event',
           h('h2.title', event.name),
           h('span.date', new Date(event.start_time).toString()),
           h('p.description', event.description),
           h('iframe', {src: 'http://localhost:8080/', style: {width: '625px',
                        height: '416px'}}),
           h('div.tc',
             h('a', {href: event.photos.data[imgCount].images[0].source},
               h('img', {src: event.photos.data[imgCount].images[0].source}))
            ));
}
