import { neon } from '@neondatabase/serverless';
import MapScreen from '@/components/MapScreen';
import Header from '@/components/header';
async function getLocationData() {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT * FROM sensor`;
  const temp_data = await sql`SELECT tempdataid, date_time, temp_f, rel_humid, dew_point_f, sensorid
FROM (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY sensorid ORDER BY date_time DESC) AS rn
  FROM temp_data
) AS latest
WHERE rn = 1;
`
const locations = response.map(sensor => {
  // Find the corresponding temperature data by sensorid
  const temp = temp_data.find(data => data.sensorid === sensor.sensorid);

  // Return combined data for each sensor
  return {
    sensorid: sensor.sensorid,
    latitude: sensor.latitude,
    longitude: sensor.longitude,
    location: sensor.location,
    deploy_date: sensor.deploy_date,
    // Temperature and humidity data (if found)
    tempdataid: temp?.tempdataid || null,
    date_time: temp?.date_time || null,
    temp_f: temp?.temp_f || null,
    rel_humid: temp?.rel_humid || null,
    dew_point_f: temp?.dew_point_f || null,
    skyview_factor: temp?.skyview_factor || null,
  };
});

return locations
}
export default async function Page() {
  const data = await getLocationData();
  return <>
  <Header />
  <MapScreen locations = {data}/>;
  </>
  
}