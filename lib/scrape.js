// var levelup = require('level');
// var db = levelup('./db', {valueEncoding: 'json'});

var fs = require('fs');
var url = require('url');
var request = require('request');
var cheerio = require('cheerio');

var BASE_URL = 'http://www.ubu.com/sound/';