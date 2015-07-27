var loc = [__JSON_GLOBALS_.lat, __JSON_GLOBALS_.lon];
var title = __JSON_GLOBALS_.title;
var map = L.map('map').setView(loc, __JSON_GLOBALS_.zoom);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+__JSON_GLOBALS_.mapbox_access, {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(map);


L.marker(loc).addTo(map)
.bindPopup("<b>"+__JSON_GLOBALS_.title+"</b>").openPopup();
