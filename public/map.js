var addressPoints = [
    [51.5, -0.5, "ID1"],
    [52.5, -0.1, "ID2"],
    [53.5, -1, "ID3"],
    [51, -2, "ID4"],
    [52.5, -2.5, "ID5"],
    [51.5, -3, "ID6"],
    [55, -2, "ID7"]
]

var map = L.map('map').setView([53, -4], 6);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = L.markerClusterGroup();

for (var i = 0; i < addressPoints.length; i++) {
    var a = addressPoints[i];
    var title = a[2];
    var marker = L.marker(new L.LatLng(a[0], a[1]), {
        title: title
    });
    marker.bindPopup(title);
    markers.addLayer(marker);
    map.addLayer(markers);
}