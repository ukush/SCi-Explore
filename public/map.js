var map = new L.Map('leaflet', {
    center: [53, -0.8],
    zoom: 6,
    cursor: true
});

//Creates an array of co-ordinates
const pins = [
    [51.5, -0.5],
    [52.5, -0.1],
    [53.5, -1],
    [51, -2],
    [52.5, -2.5],
    [51.5, -3],
    [55, -2]
]

pins.forEach((pin) => {
    L.marker(pin).addTo(map).bindPopup("<b>Scene</b><br>Data here")
});

//Use this to create all single map pin
//var marker = L.marker([51.5, -3]).addTo(map);
//marker.bindPopup("<b>Scene</b><br>") //add data we want

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

L.geoJSON(mission, {
    onEachFeature: onEachFeature
}).addTo(map)