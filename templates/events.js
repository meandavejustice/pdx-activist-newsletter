var h = require('hyperscript');

module.exports = function(org, events) {
  return h('div.events',
           h('h2.title', "Upcoming Events for " + org),
           h('ul', events.map(eventListItem)))
}

function eventListItem(event) {
  return h('li.event',
           h('a', {href: '/event/'},
             h('h4.event-title.di', event.name),
             h('p.di', " | "),
             h('span.date', new Date(event.start_time).toString())));
}
