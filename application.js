
CM_ATTR = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="http://cloudmade.com">CloudMade</a>';

CM_URL = 'http://{s}.tile.cloudmade.com/f8a4bd5801d64e6c8d0845c5b32ff0cd/{styleId}/256/{z}/{x}/{y}.png';

OSM_URL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
OSM_ATTRIB = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//var map = L.map('map').setView([51.505, -0.09], 13);
southWest = new L.LatLng(34.018259,-118.291372),
    northEast = new L.LatLng(34.026217,-118.278358),
    boundGalores = new L.LatLngBounds(southWest, northEast);
    //debugger;

var map = L.map('map').setView([34.02, -118.29], 18);
L.tileLayer('http://{s}.tile.cloudmade.com/f8a4bd5801d64e6c8d0845c5b32ff0cd/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18,
    maxBounds: boundGalores,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);

//L.marker([51.5, -0.09]).addTo(map)
    //.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

//L.circle([51.508, -0.11], 500, {
    //color: 'red',
    //fillColor: '#f03',
    //fillOpacity: 0.5
//}).addTo(map).bindPopup("I am a circle.");

//L.polygon([
    //[51.509, -0.08],
    //[51.503, -0.06],
    //[51.51, -0.047]
//]).addTo(map).bindPopup("I am a polygon.");


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

$.getJSON('buildings.json', function(data) {
    console.log(data);
});

