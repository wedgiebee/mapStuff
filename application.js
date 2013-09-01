//var map = L.map('map').setView([51.505, -0.09], 13);
var southWest = new L.LatLng(34.01654, -118.2945),
    northEast = new L.LatLng(34.03463, -118.27435),
    center = new L.LatLng(34.02179, -118.2867);
var currentBuildings = {};
var currentZoom = 16;

var map = L.map('map', {center: center, zoom:currentZoom});
L.tileLayer('http://{s}.tile.cloudmade.com/f8a4bd5801d64e6c8d0845c5b32ff0cd/997/256/{z}/{x}/{y}.png', {
    minZoom: 13,
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);

// loading buildings

function format(item) { return item.name + " (" + item.initials + ")"; }

$.getJSON('buildings2.json', function(data) {
    $("#buildings").select2({
        placeholder: "Select a building",
        data:{ results: data, text: 'name' },
        multiple: true,
        formatSelection: format,
        formatResult: format
    });
});

// various event handlers
//
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
//map.on('click', onMapClick);

function addCircle(item){
    var circle = L.circle(item.latlng, 50, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);
    currentBuildings[item.id] = circle;
}

function removeCircle(item){
    map.removeLayer(currentBuildings[item.id]);
    delete currentBuildings[item.id];
}

$("#buildings").on("change", function(e){
    if (e.hasOwnProperty('added')){
        addCircle(e.added);
    }
    if (e.hasOwnProperty('removed')){
        removeCircle(e.removed);
    }
});

$("#clear").on("click", function(){
    for (var building in currentBuildings){
        map.removeLayer(currentBuildings[building]);
    }
    currentBuildings = {};
    $("#buildings").select2("val", "");
});

$("#center").on("click", function(){
    map.panTo(center).setZoom(currentZoom);
});

//var location = $.url().param("locations");
//if (location){
    //var selected = location.split(",");
    //for (var s in selected){
        //console.log(s);
    //}
//}
