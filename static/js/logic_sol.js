// Step 1: Set Up the Basic API Call and Function Structure

// Perform an API call to the Citi Bike API to get the station information.
// 🚨 Syntax hint: d3.json("API_URL").then(callbackFunction);
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(
  createMarkers
);

// Step 2: Create the createMarkers function to handle the API response
function createMarkers(response) {
  // 🚨 Log the response to ensure data is being fetched correctly
  console.log("API response:", response);

  // Pull the "stations" property from response.data.
  let stations = response.data.stations;
  // 🚨 Log the stations data to verify the extraction
  console.log("Stations data:", stations);

  // Initialize an array to hold bike markers.
  let bikeMarkers = [];

  // Loop through the stations array.
  for (let index = 0; index < stations.length; index++) {
    let station = stations[index];

    // 🚨 Log each station's data to understand its structure
    console.log("Station data:", station);

    // For each station, create a marker, and bind a popup with the station's name.
    let bikeMarker = L.marker([station.lat, station.lon]).bindPopup(
      "<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>"
    );
    // 🚨 Syntax hint: L.marker([latitude, longitude]).bindPopup("Popup content");

    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(bikeMarker);
    // 🚨 Syntax hint: array.push(element);
  }

  // 🚨 Log the bikeMarkers array to check the markers
  console.log("Bike markers array:", bikeMarkers);

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
  // 🚨 Syntax hint: L.layerGroup(array);
}

// Step 3: Create the createMap function to initialize the map and layers
function createMap(bikeStations) {
  // 🚨 Log the bikeStations layer to verify the layer group
  console.log("Creating map with bike stations:", bikeStations);

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );
  // 🚨 Syntax hint: L.tileLayer("Tile layer URL", { options });

  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap,
  };
  // 🚨 Syntax hint: let objectName = { "Key": value };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "Bike Stations": bikeStations,
  };

  // Create the map object with options.
  let map = L.map("map-id", {
    center: [40.73, -74.0059], // Center the map at latitude 40.73 and longitude -74.0059 (New York City)
    zoom: 12, // Set the zoom level to 12
    layers: [streetmap, bikeStations], // Add both the streetmap and bikeStations layers to the map
  });
  // 🚨 Syntax hint: L.map("map-id", { options });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  // L.control
  //   .layers(baseMaps, overlayMaps, {
  //     collapsed: false, // Ensure the layer control is not collapsed by default
  //   })
  //   .addTo(map);
  // 🚨 Syntax hint: L.control
  //   .layers(baseMaps, overlayMaps, { options })
  //   .addTo(map);
}

// Explanation of Each Step:
// Step 1: Use d3.json to fetch data from the Citi Bike API and pass the response to the createMarkers function.
// Step 2: In createMarkers:
// - Log the API response to verify data fetching.
// - Extract the stations data from the response and log it.
// - Initialize an array to hold bike markers.
// - Loop through the stations data, log each station's data, create markers, and add them to the bikeMarkers array.
// - Log the bikeMarkers array to verify the markers.
// - Create a layer group from the bike markers array and pass it to the createMap function.
// Step 3: In createMap:
// - Log the bikeStations layer to verify the layer group.
// - Create the tile layer for the map background using OpenStreetMap tiles.
// - Create baseMaps and overlayMaps objects to hold the respective layers.
// - Initialize the map object centered at New York City with a zoom level of 12, adding the streetmap and bikeStations layers.
// - Add a layer control to the map, enabling toggling between the base and overlay maps, and ensure it is not collapsed by default.
