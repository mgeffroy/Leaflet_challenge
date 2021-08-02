// Create map object  
var myMap = L.map("mapid", {
    center: [
      20.09, -50.71
    ],
    zoom: 4,
});
// Create title layer 
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
}).addTo(myMap)

// Get GeoJSON information 
// console log to see characterstics and 


//Create markers for earthquakes ( circles)
// Markers are different colors and sizes depending on magnitude 


