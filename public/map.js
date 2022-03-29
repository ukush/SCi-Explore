var map = L.map('map').setView([53, -4], 6);

var addressPoints = [
    [51.5, -0.5, "Metadata goes here"],
    [52.5, -0.1, "Metadata goes here"],
    [53.5, -1, "Metadata goes here"],
    [51, -2, "Metadata goes here"],
    [52.5, -2.5, "Metadata goes here"],
    [51.5, -3, "Metadata goes here"],
    [55, -2, "Metadata goes here"]
]

var polygon = L.polygon([
    [51.509, -3.08],
    [51.51, -0.047],
    [55.503, -0.06],
    [55.503, -3.06]
])

L.tileLayer('').addTo(map);

var markers = L.markerClusterGroup();
var polygons = L.layerGroup([polygon]);

var ctrl = L.control.layers([]);
ctrl.addOverlay(markers, 'Pins');
ctrl.addOverlay(polygons, 'Polygons');
ctrl.addTo(map);

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