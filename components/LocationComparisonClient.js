'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(LineElement, LinearScale, CategoryScale, Tooltip, Legend);

// Helper function to group temperature data by location
const groupByLocation = (locations) => {
  return locations.reduce((acc, location) => {
    const { location: locName, temp_f, date_time, sensorid, latitude, longitude } = location;

    if (!acc[locName]) {
      acc[locName] = {
        location: locName,
        sensorid,
        latitude,
        longitude,
        temp_history: []
      };
    }

    acc[locName].temp_history.push({ temp_f, date_time });
    return acc;
  }, {});
};

export default function LocationComparisonClient({ locations }) {
  const groupedLocations = Object.values(groupByLocation(locations)); // Get grouped data as an array
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Handle multi-select change
  const handleLocationChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options).filter(option => option.selected).map(option => option.value);
    setSelectedLocations(selected);
  };

  // Prepare data for the line chart
  const prepareChartData = () => {
    const datasets = selectedLocations.map((locationName) => {
      const locationData = groupedLocations.find(location => location.location === locationName);

      if (!locationData || !locationData.temp_history) return null;

      const temperatures = locationData.temp_history.map(entry => entry.temp_f);
      const timeLabels = locationData.temp_history.map(entry => entry.date_time);

      return {
        label: `Temperature at ${locationData.location}`,
        data: temperatures,
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random color for each dataset
        fill: false,
        pointRadius: selectedLocations.length > 1 ? 0 : 4, // Disable points if multiple locations are selected
        pointHoverRadius: selectedLocations.length > 1 ? 0 : 6,
      };
    }).filter(Boolean);

    const timeLabels = groupedLocations[0]?.temp_history.map(entry => entry.date_time) || [];
    return {
      labels: timeLabels,
      datasets,
    };
  };

  const chartData = prepareChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°F)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2em', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Location Comparison</h1>

      {/* Multi-select Dropdown for Locations */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2em' }}>
        <div>
          <label>Select Locations:</label>
          <select
            multiple
            value={selectedLocations}
            onChange={handleLocationChange}
            style={dropdownStyle}
          >
            {groupedLocations.map(location => (
              <option key={location.sensorid} value={location.location}>{location.location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Line Chart */}
      <div style={chartContainerStyle}>
        {chartData && chartData.datasets.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>Select one or more locations to view their data</p>
        )}
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
  width: '300px',
  marginTop: '0.5em',
  color: 'black',
  height: '150px',
};

const chartContainerStyle = {
  width: '100%',
  height: '500px',
  backgroundColor: '#ffffff',
  padding: '1em',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};
