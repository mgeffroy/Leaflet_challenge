# Leaflet_challenge 🗺️
## Introduction 🌎 ⛰️
This repository contains worldwide earthquake information. Data from the USGS was used to create interactive maps where information of earthquakes can be understood in an easy and dynamic way. 
The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists collect a massive amount of data from all over the world each day.


## Contents 📁 💻
The project is divided in two, depending on the difficulty level: 
Both folders include an index file for the html code, a css file, and two JavaScript files.
The visualization has to be run through the python -m http.server; to avoid CORS errors.
Both repository folders are organized as listed here: 
  - index.html: Contains all html code to visualize the graphs and information. 
  - **static**: 
    - **css**: Contains the style.css file. 
    - **js**: Contains the logic.js file which has all the code that retrieves GeoJSON information and creates the map with markers and layers. As well it contains the config.js that has the key needed to get the maps from mapbox.     

## Outcome 
The final map has circles that mark all the earthquakes that have happend all over the world in the last week. Circle size and color change depending on the depth and magnitude of the earthquake. If a circle is clicked it will give the location, magnitude and depth of that specific earthquake. The map might look like this:

![image](https://user-images.githubusercontent.com/79372976/128950769-917f74f7-9c95-4c29-9915-9fdc3a5d2c38.png)



*This was created by: Mariana Geffroy*
*for the Tecnológico de Monterrey Data Analysis Bootcamp*
