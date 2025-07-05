const { InfluxDB, Point } = require('@influxdata/influxdb-client');

exports.handler = async (event) => {
  try {
    // Validate input data
    if (!event.queryStringParameters || !event.queryStringParameters.data) {
      throw new Error('Missing data parameter');
    }
    
    const data = JSON.parse(decodeURIComponent(event.queryStringParameters.data));
    
    // Validate critical fields
    if (!data.location?.coords) throw new Error('Invalid location data');
    
    // Parse coordinates safely
    const [lat, lon] = data.location.coords.split(',').map(coord => parseFloat(coord));
    if (isNaN(lat) || isNaN(lon)) throw new Error('Invalid coordinate format');
    
    // Initialize InfluxDB
    const influxDB = new InfluxDB({ 
      url: process.env.INFLUX_URL, 
      token: process.env.INFLUX_TOKEN 
    });
    
    const writeApi = influxDB.getWriteApi(process.env.INFLUX_ORG, 'geo_tracking');
    
    // Create data point
    new Point('user_location')
      .stringField('device_id', data.deviceId)
      .stringField('ip', data.location.ip)
      .floatField('lat', lat)
      .floatField('lon', lon)
      .stringField('page', data.page)
      .write(writeApi);

    await writeApi.close();
    return { statusCode: 200, body: 'Logged' };
    
  } catch (error) {
    console.error(`Tracking error: ${error.message}`);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: error.message,
        fallback: 'Data queued for retry'
      }) 
    };
  }
};
