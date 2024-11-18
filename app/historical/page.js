// pages/sensorHistory.js
import Header from '@/components/header';
import { neon } from '@neondatabase/serverless';
import ClientFilterComponent from '@/components/ClientFilterComponent';
async function getLocationData() {
  const sql = neon(process.env.DATABASE_URL);

  // Fetch all historical data for all sensors
  const response = await sql`
    SELECT tempdataid, date_time, temp_f, rel_humid, dew_point_f, skyview_factor, sensorid
    FROM temp_data
    ORDER BY date_time DESC
    LIMIT 50;
  `;

  return response;
}

export default async function SensorHistoryPage() {
  const allSensorData = await getLocationData(); // Fetch data server-side initially

  return (
    <>
      <Header />
      <ClientFilterComponent allSensorData={allSensorData} />
    </>
  );
}
