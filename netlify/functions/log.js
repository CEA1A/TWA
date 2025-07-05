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
