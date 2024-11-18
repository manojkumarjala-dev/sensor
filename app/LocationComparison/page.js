// pages/locationComparison.js
import { neon } from '@neondatabase/serverless';
import LocationComparisonClient from '@/components/LocationComparisonClient';
import Header from '@/components/header';

async function getLocationData() {
  const sql = neon(process.env.DATABASE_URL);

  // Fetch all sensors with their latest temperature data
  const sensors = await sql`
    SELECT sensorid, latitude, longitude, location
    FROM sensor
  `;

  const latestTemperatureEntries = await sql`
    SELECT tempdataid, date_time, temp_f, rel_humid, dew_point_f, skyview_factor, sensorid
    FROM (
      SELECT *,
             ROW_NUMBER() OVER (PARTITION BY sensorid ORDER BY date_time DESC) AS rn
      FROM temp_data
    ) AS latest
    WHERE rn = 1;
  `;

  // Combine sensors with their latest temperature data
  const locations = sensors.map(sensor => {
    const tempData = latestTemperatureEntries.find(data => data.sensorid === sensor.sensorid);
    return {
      ...sensor,
      temp_f: tempData?.temp_f || null,
      rel_humid: tempData?.rel_humid || null,
      dew_point_f: tempData?.dew_point_f || null,
      date_time: tempData?.date_time || null,
    };
  });

  return locations;
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
