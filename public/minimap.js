//Use this to create  missions containing scenes
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

var mission = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {
            "name": "Scene",
            "popupContent": "EnterTextHere"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [0.363, 51.694],
                    [0.37, 51.694],
                    [0.373, 51.739],
                    [0.366, 51.739],
                    [0.363, 51.694]
                ]
            ]
        }
    }]
}

var map = new L.Map('minimap', {
    center: [53, -4],
    zoom: 6,
    cursor: true
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.geoJSON(mission, {
    onEachFeature: onEachFeature
}).addTo(map)