L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXBzaHUxIiwiYSI6ImNrendqazFqazAyNDUydW80bW1wbGViNWwifQ.w-GPue2cxYHIzjeEk_vwIg'
}).addTo(map);