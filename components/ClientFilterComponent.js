'use client'
import React, { useState } from 'react';
export default function ClientFilterComponent({ allSensorData }) {
  const [sensorIdFilter, setSensorIdFilter] = useState('');

  const handleInputChange = (e) => {
    setSensorIdFilter(e.target.value);
  };

  // Filter the data based on the sensor ID entered by the user
  const filteredData = sensorIdFilter
    ? allSensorData.filter((entry) => entry.sensorid.toString().includes(sensorIdFilter))
    : allSensorData;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '2em' }}>
      <h1 style={{ textAlign: 'center' }}>Sensor History</h1>
      <div style={{ textAlign: 'center', marginBottom: '1em' }}>
        <input
          type="text"
          value={sensorIdFilter}
          onChange={handleInputChange}
          placeholder="Filter by Sensor ID"
          style={{
            padding: '0.7em',
            borderRadius: '5px',
            border: '2px solid #007BFF',
            outline: 'none',
            fontSize: '1em',
            width: '200px',
            color:'black'
          }}
        />
      </div>

      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        {filteredData.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: '0', color:'black' }}>
            {filteredData.map((entry) => (
              <li key={entry.tempdataid} style={{
                backgroundColor: '#ffffff',
                padding: '1em',
                borderRadius: '5px',
                marginBottom: '0.5em',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}>
                <p><strong>Sensor ID:</strong> {entry.sensorid}</p>
                <p><strong>Date:</strong> {entry.date_time}</p>
                <p><strong>Temperature:</strong> {entry.temp_f} °F</p>
                <p><strong>Humidity:</strong> {entry.rel_humid} %</p>
                <p><strong>Dew Point:</strong> {entry.dew_point_f} °F</p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No data found for this Sensor ID.</p>
        )}
      </div>
    </div>
  );
}
