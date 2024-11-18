// components/LocationComparisonClient.js
'use client';

import React, { useState } from 'react';

export default function LocationComparisonClient({ locations }) {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');

  // Find data for the selected locations
  const locationData1 = locations.find(location => location.location === location1);
  const locationData2 = locations.find(location => location.location === location2);

  const handleLocation1Change = (e) => setLocation1(e.target.value);
  const handleLocation2Change = (e) => setLocation2(e.target.value);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2em', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Location Comparison</h1>

      {/* Dropdowns for Location Selection */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2em', marginBottom: '2em' }}>
        <div>
          <label>Location 1:</label>
          <select value={location1} onChange={handleLocation1Change} style={dropdownStyle}>
            <option value="">Select a location</option>
            {locations.map(location => (
              <option key={location.sensorid} value={location.location}>{location.location}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Location 2:</label>
          <select value={location2} onChange={handleLocation2Change} style={dropdownStyle}>
            <option value="">Select a location</option>
            {locations.map(location => (
              <option key={location.sensorid} value={location.location}>{location.location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Data for Selected Locations */}
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <div style={locationDataStyle}>
          {locationData1 ? (
            <>
              <h2>{locationData1.location}</h2>
              <p><strong>Temperature:</strong> {locationData1.temp_f} °F</p>
              <p><strong>Humidity:</strong> {locationData1.rel_humid} %</p>
              <p><strong>Dew Point:</strong> {locationData1.dew_point_f} °F</p>
              <p><strong>Last Updated:</strong> {locationData1.date_time}</p>
            </>
          ) : (
            <p>Select a location to view data</p>
          )}
        </div>

        <div style={locationDataStyle}>
          {locationData2 ? (
            <>
              <h2>{locationData2.location}</h2>
              <p><strong>Temperature:</strong> {locationData2.temp_f} °F</p>
              <p><strong>Humidity:</strong> {locationData2.rel_humid} %</p>
              <p><strong>Dew Point:</strong> {locationData2.dew_point_f} °F</p>
              <p><strong>Last Updated:</strong> {locationData2.date_time}</p>
            </>
          ) : (
            <p>Select a location to view data</p>
          )}
        </div>
      </div>
    </div>
  );
}

const dropdownStyle = {
  padding: '0.7em',
  borderRadius: '5px',
  border: '2px solid #007BFF',
  outline: 'none',
  fontSize: '1em',
  width: '200px',
  marginTop: '0.5em',
  color: 'black'
};

const locationDataStyle = {
    color:'black',
  backgroundColor: '#ffffff',
  padding: '1em',
  borderRadius: '5px',
  width: '40%',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};
