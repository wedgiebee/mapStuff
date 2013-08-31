//var map = L.map('map').setView([51.505, -0.09], 13);
var southWest = new L.LatLng(34.018259,-118.291372),
    northEast = new L.LatLng(34.026217,-118.278358),
    boundGalores = new L.LatLngBounds(southWest, northEast);
var currentBuildings = {};

var map = L.map('map').setView([34.02179, -118.2867], 17);
L.tileLayer('http://{s}.tile.cloudmade.com/f8a4bd5801d64e6c8d0845c5b32ff0cd/997/256/{z}/{x}/{y}.png', {
    minZoom: 16,
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

// click event handler

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
//map.on('click', onMapClick);

// loading buildings
function format(item) { return item.name + " (" + item.initials + ")"; }

$.getJSON('buildings2.json', function(data) {
    buildings = data;
    $("#buildings").select2({
        placeholder: "Select a building",
        data:{ results: data, text: 'name' },
        multiple: true,
        formatSelection: format,
        formatResult: format
    });
});

$("#buildings").on("change", function(e){
    if (e.hasOwnProperty('added')){
        var circle = L.circle(e.added.latlng, 50, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(map);
        currentBuildings[e.added.id] = circle;
    }
    if (e.hasOwnProperty('removed')){
        map.removeLayer(currentBuildings[e.removed.id]);
        delete currentBuildings[e.removed.id];
    }

    console.log(currentBuildings);
});
