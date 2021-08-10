// Create markersize function 
function markerSize(mag) {
    return mag * 20000;
  }

//Create color function 
// tried making and if/else function but it didn't work. Found this on  https://leafletjs.com/examples/choropleth/
function getColor(coordinates) {
    return coordinates > 100 ? '#cc0000' :
           coordinates> 80  ? '#ff7800' :
           coordinates> 60 ? '#ff9234' :
           coordinates > 40   ? '#ffee00' :
           coordinates > 20   ? '#fff976' :
           coordinates > 10   ? '#82cc00' :
                      '#008a33';
}


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

    // Start loop to go through data 
    for (var i=0; i<data.features.length; i++){
        var coordinates = data.features[i].geometry.coordinates;
        
       // See the numbers for our colors and variables 
       //console.log(coordinates[2]);
       //console.log(data.features[i].properties.mag)
       // Markers are different size depending on magnitude
       // Different color depending on depth
      var circleCharac = {
            color:getColor(data.features[i].geometry.coordinates[2]),
            fillColor:getColor(data.features[i].geometry.coordinates[2]),
            fillOpacity:.5,
            radius:markerSize(data.features[i].properties.mag)};


       if (coordinates){
           //Create markers for earthquakes (circles)
          var marker = L.circle([coordinates[1],coordinates[0]], circleCharac)
          .addTo(myMap);
         
          // add popup explaining place depth and magnitude when hovering over circle 
         marker.bindPopup("<h1>" +" Place of earthquake: <br>" + data.features[i].properties.place + "</h1> <hr> <h2>" + "Magnitude: " + data.features[i].properties.mag + "</h2> <h2>" +  "Depth: "+ data.features[i].geometry.coordinates[2] + "</h2>")
         .addTo(myMap);
        }
    }
});



// add legend explaining the color code 
// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(myMap);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(myMap);


