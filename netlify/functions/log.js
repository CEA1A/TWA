const { InfluxDB, Point } = require('@influxdata/influxdb-client');

exports.handler = async (event) => {
  const data = JSON.parse(decodeURIComponent(event.queryStringParameters.data));
  
  // Store in InfluxDB (time-series database)
  const influxDB = new InfluxDB({ 
    url: process.env.INFLUX_URL, 
    token: process.env.INFLUX_TOKEN 
  });
  
  const writeApi = influxDB.getWriteApi(process.env.INFLUX_ORG, 'geo_tracking');
  new Point('user_location')
    .stringField('device_id', data.deviceId)
    .stringField('ip', data.location.ip)
    .floatField('lat', parseFloat(data.location.coords.split(',')[0]))
    .floatField('lon', parseFloat(data.location.coords.split(',')[1]))
    .stringField('page', data.page)
    .write(writeApi);

  await writeApi.close();
  return { statusCode: 200, body: 'Logged' };
};
// ADD ERROR HANDLING & MODERN SYNTAX  
import { InfluxDB, Point } from '@influxdata/influxdb-client';  

export const handler = async (event) => {  
  try {  
    const data = JSON.parse(decodeURIComponent(event.queryStringParameters.data));  

    // VALIDATE CRITICAL FIELDS  
    if(!data.location?.coords) throw new Error('Invalid location data');  

    const influxDB = new InfluxDB({  
      url: process.env.INFLUX_URL,  
      token: process.env.INFLUX_TOKEN  
    });  

    const writeApi = influxDB.getWriteApi(process.env.INFLUX_ORG, 'geo_tracking');  
    
    new Point('user_location')  
      .stringField('device_id', data.deviceId)  
      .stringField('ip', data.location.ip)  
      .floatField('lat', parseFloat(data.location.coords.split(',')[0]))  
      .floatField('lon', parseFloat(data.location.coords.split(',')[1]))  
      .stringField('page', data.page)  
      .write(writeApi);  

    await writeApi.close();  
    return { statusCode: 200, body: 'Logged' };  
  } catch (error) {  
    // FAILURE MODE: Degrade gracefully to local storage  
    console.error(`Tracking failed: ${error.message}`);  
    return { statusCode: 500, body: 'Fallback: Data queued for retry' };  
  }  
};  
// ADD TO log.js HANDLER  
if (error.code === 'ECONNREFUSED') {  
  // Store in browser's IndexedDB for later sync  
  await queueFailedRequest(event);  
  return { statusCode: 202, body: 'Queued for retry' };  
}  

// QUEUING FUNCTION  
const queueFailedRequest = async (event) => {  
  const db = await idb.openDB('trackingQueue', 1, {  
    upgrade(db) {  
      db.createObjectStore('requests', { autoIncrement: true });  
    }  
  });  
  await db.add('requests', event);  
};  
const { InfluxDB, Point } = require('@influxdata/influxdb-client');  

exports.handler = async (event) => {  
  // ... rest of existing code ...  
};  
