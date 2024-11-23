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
          <div style={{
            backgroundColor: 'white',
            padding: '1em',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            maxWidth: '200px',
            textAlign: 'center',
          }}>
            <h4 style={{
              margin: '0 0 0.5em 0',
              color: '#333',
              fontSize: '1.1em',
              fontWeight: 'bold',
            }}>Sensor ID: {selectedLocation.sensorid}</h4>
            <div style={{ borderTop: '1px solid #eee', paddingTop: '0.5em' }}>
              <p style={{ margin: '0.5em 0', color: '#666', fontSize: '0.9em' }}>
                <strong>Temperature:</strong> {selectedLocation.temp_f} °F
              </p>
              <p style={{ margin: '0.5em 0', color: '#666', fontSize: '0.9em' }}>
                <strong>Humidity:</strong> {selectedLocation.rel_humid} %
              </p>
              <p style={{ margin: '0.5em 0', color: '#666', fontSize: '0.9em' }}>
                <strong>Dew Point:</strong> {selectedLocation.dew_point_f} °F
              </p>
            </div>
          </div>
        </Popup>
        
        )}
      </Map>
    </div>
  );
});

export default MapScreen;
