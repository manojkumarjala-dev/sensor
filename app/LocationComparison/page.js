// pages/locationComparison.js
import { neon } from '@neondatabase/serverless';
import LocationComparisonClient from '@/components/LocationComparisonClient';
import Header from '@/components/header';

async function getLocationData() {
  const sql = neon(process.env.DATABASE_URL);

  // Fetch all active sensors with their details
  const sensors = await sql`
    SELECT sensorid, latitude, longitude, location
    FROM sensor
    WHERE status = 'ACTIVE'
  `;

  // Fetch latest temperature entries for active sensors
  const allTemperatureEntries = await sql`
  SELECT t.tempdataid, t.date_time, t.temp_f, t.rel_humid, t.dew_point_f, t.skyview_factor, t.sensorid, s.location, s.latitude, s.longitude
  FROM temp_data t
  INNER JOIN sensor s
  ON t.sensorid = s.sensorid
  WHERE s.status = 'ACTIVE'
  ORDER BY t.sensorid, t.date_time ASC;
`;


  // Combine latest temperature data with sensor location details
  const combinedData = allTemperatureEntries.map(entry => {
    const sensor = sensors.find(sensor => sensor.sensorid === entry.sensorid);
    return {
      ...entry,
      location: sensor?.location || null,
      latitude: sensor?.latitude || null,
      longitude: sensor?.longitude || null,
    };
  });

  return combinedData;
}


export default async function LocationComparisonPage() {
  const locationsData = await getLocationData();

  return (
    <>
      <Header />
      <LocationComparisonClient locations={locationsData} />
    </>
  );
}
