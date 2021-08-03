// Create markersize function 
function markerSize(mag) {
    return mag * 20000;
  }

//Create color function 
function depthColor(coordinates) {
    if ( coordinates>= 100) {
        color = "red";
      }
      else if (coordinates <= 99 && coordinates >= 80) {
        color = "blue";
      }
      else if (coordinates <= 79 && coordinates >= 60) {
        color = "yellow";
      }
      else if (coordinates <= 59 && coordinates >= 40) {
        color = "purple";
      }
      else if (coordinates <= 39 && coordinates >= 20) {
        color = "white";
      }
      else {
        color = "green";
      }


};


// Create map object  
var myMap = L.map("mapid", {
    center: [
      30.09, -60.71
    ],
    zoom: 3.5,
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
var gJURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(gJURL).then(data =>{
    // console log to see characterstics and elements(features)
    console.log(data.features)

    // 
    for (var i=0; i<data.features.length; i++){
        var coordinates = data.features[i].geometry.coordinates;
        
        // See the numbers for our colros and variables 
        //console.log(coordinates[2]);
       //console.log(data.features[i].properties.mag)

       if (coordinates){
          L.circle([coordinates[1],coordinates[0]], {
              color:depthColor(data.features[i].geometry.coordinates[3]),
              fillColor:depthColor(data.features[i].geometry.coordinates[3]),
              fillOpacity:.5,
              radius:markerSize(data.features[i].properties.mag)
          }).addTo(myMap);
        }
    }
});



//Create markers for earthquakes (circles)

// Markers are different size depending on magnitude

// Different color depending on depth

// Use switch for them to be different colors or if/else 

// add popup explaining place 

// do we need hoverning events? 


