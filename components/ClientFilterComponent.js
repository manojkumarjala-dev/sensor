'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function ClientFilterComponent({ allSensorData }) {
  const [selectedSensor, setSelectedSensor] = useState(null);

  // Group data by location
  const groupedData = allSensorData.reduce((acc, entry) => {
    const { location, temp_f, date_time } = entry;
    if (!acc[location]) acc[location] = [];
    acc[location].push({ temp_f, date_time });
    return acc;
  }, {});

  const handleSensorChange = (e) => setSelectedSensor(e.target.value);

  const selectedSensorData = groupedData[selectedSensor] || [];

  const prepareChartData = () => {
    if (!selectedSensorData.length) return null;

    const timeLabels = selectedSensorData.map((entry) => entry.date_time); // x-axis labels
    const temperatures = selectedSensorData.map((entry) => entry.temp_f); // y-axis data

    return {
      labels: timeLabels,
      datasets: [
        {
          label: `Temperature at ${selectedSensor}`,
          data: temperatures,
          borderColor: '#007BFF',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0, // Remove clutter by hiding points
          pointHoverRadius: 6, // Show points only on hover
        },
      ],
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
          font: { size: 16 },
        },
        ticks: {
          color: '#666', // Subtle x-axis labels
          maxTicksLimit: 8, // Reduce the number of ticks for clarity
        },
        grid: {
          display: false, // Hide x-axis grid lines for a cleaner look
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°F)',
          font: { size: 16 },
        },
        ticks: {
          color: '#666', // Subtle y-axis labels
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)', // Light gray grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#333',
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} °F`;
          },
        },
      },
    },
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2em' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1em' }}>Sensor Temperature History</h1>

      {/* Dropdown for Sensor Location Selection */}
      <div style={{ textAlign: 'center', marginBottom: '2em' }}>
        <label htmlFor="sensorDropdown" style={{ marginRight: '1em', fontSize: '1.2em', color: '#333' }}>
          Select a Sensor Location:
        </label>
        <select
          id="sensorDropdown"
          onChange={handleSensorChange}
          style={{
            padding: '0.7em',
            borderRadius: '5px',
            border: '2px solid #007BFF',
            outline: 'none',
            fontSize: '1em',
            width: '300px',
            color: 'black',
          }}
        >
          <option value="">-- Select a Location --</option>
          {Object.keys(groupedData).map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Display Line Chart for Selected Sensor */}
      <div style={{ 
  maxWidth: '1400px', 
  margin: 'auto', 
  padding: '1em', 
  backgroundColor: '#ffffff', 
  borderRadius: '8px', 
  height: '800px' // Set a fixed height for the graph container
}}>
  {chartData ? (
    <Line 
      data={chartData} 
      options={{
        ...chartOptions,
        maintainAspectRatio: false, // Ensures the graph uses the height of the container
      }} 
    />
  ) : (
    <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1em' }}>
      Select a location to view its temperature history.
    </p>
  )}
</div>

    </div>
  );
}
