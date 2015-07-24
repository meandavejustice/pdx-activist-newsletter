var levelup = require('level');
var db = levelup('../eventsDb', {valueEncoding: 'json'});

db.createReadStream().on('data', console.log);
