'use client'
import React, { useState } from 'react';

export default function ClientFilterComponent({ allSensorData }) {
  const [sensorIdFilter, setSensorIdFilter] = useState('');
  const [visibleEntries, setVisibleEntries] = useState(25); // Show 23 entries initially

  const handleInputChange = (e) => {
    setSensorIdFilter(e.target.value);
    setVisibleEntries(25); // Reset to 23 entries when filter changes
  };

  // Filter the data based on the sensor ID entered by the user
  const filteredData = sensorIdFilter
    ? allSensorData.filter((entry) => entry.sensorid.toString().includes(sensorIdFilter))
    : allSensorData;

  // Data to display based on current filter and visible entries
  const displayedData = filteredData.slice(0, visibleEntries);

  const loadMore = () => {
    setVisibleEntries((prevVisible) => prevVisible + 23); // Show 23 more entries
  };

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
            color: 'black',
          }}
        />
      </div>

      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        {displayedData.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: '0', color: 'black' }}>
            {displayedData.map((entry) => (
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

        {/* Load More Button */}
        {visibleEntries < filteredData.length && (
          <div style={{ textAlign: 'center', marginTop: '1em' }}>
            <button onClick={loadMore} style={{
              padding: '0.7em 1.5em',
              borderRadius: '5px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1em',
            }}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
