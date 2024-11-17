'use client';

import React, { memo, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup } from 'react-map-gl';

const MapScreen = memo(({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -86.519,
          latitude: 39.165,
          zoom: 12,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={() => setSelectedLocation(null)} // Close popup on map click
      >
        {locations.map((location) => (
          <Marker
            key={location.sensorid}
            longitude={location.longitude}
            latitude={location.latitude}
            anchor="bottom"
          >
            <img
              src="/marker.png"
              alt="Location Marker"
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent map click event from closing popup
                setSelectedLocation(location); // Set the clicked marker as selected
              }}
            />
          </Marker>
        ))}

        {selectedLocation && (
          <Popup
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            anchor="top"
            onClose={() => setSelectedLocation(null)}
            closeOnClick={false}
          >
            <div style={{ color: 'black' }}> {/* Set text color to black */}
              <h4>Sensor ID: {selectedLocation.sensorid}</h4>
              <p>Temperature: {selectedLocation.temp_f} °F</p>
              <p>Humidity: {selectedLocation.rel_humid} %</p>
              <p>Dew Point: {selectedLocation.dew_point_f} °F</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
});

export default MapScreen;
