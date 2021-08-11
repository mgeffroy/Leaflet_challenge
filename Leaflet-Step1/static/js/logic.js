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
/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Tegnforklaring</h4>";
  div.innerHTML += '<i style="background: #477AC2"></i><span>Water</span><br>';
  div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';
  div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
  div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
  div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  
  

  return div;
};

legend.addTo(myMap);


});





// add square explaining the color code 
 


