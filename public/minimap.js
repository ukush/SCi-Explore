//ONLY SHOW IF CLICKING THROUGH TO THIS PAGE FROM A PIN
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
    //

var map = L.map('minimap').setView([53, -4], 6);