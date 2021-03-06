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

L.layerGroup(L.latlng)

// add map scale
L.control.scale({ position: 'bottomleft' }).addTo(map)


// add coordinate mouse position
map.on('mousemove', function(e) {
    var latlong = `+${e.latlng.lat.toFixed(10)} ${e.latlng.lng.toFixed(10)}`
    $('#coordinates').html(latlong)
});

// add sci logo onto map as overlay
L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img')
        img.src = 'images/sci-logo.png'
        img.style.width = '60px'
        return img
    },
    onRemove: function(map) {}
});

L.control.watermark = function(openstreetmap) {
    return new L.Control.Watermark(openstreetmap)
}

L.control.watermark({ position: 'bottomright' }).addTo(map)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map)