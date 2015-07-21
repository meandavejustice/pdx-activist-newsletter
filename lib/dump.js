var levelup = require('level');
var db = levelup('../db', {valueEncoding: 'json'});

db.createReadStream().on('data', console.log);