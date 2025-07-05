const { InfluxDB } = require('@influxdata/influxdb-client');  

exports.handler = async (event) => {  
  // Admin authentication  
  const authToken = event.headers.authorization;  
  if (authToken !== `Bearer ${process.env.ADMIN_TOKEN}`) {  
    return {  
      statusCode: 401,  
      body: JSON.stringify({ error: 'Unauthorized' })  
    };  
  }  

  try {  
    const influxDB = new InfluxDB({  
      url: process.env.INFLUX_URL,  
      token: process.env.INFLUX_TOKEN  
    });  

    const deleteApi = influxDB.getDeleteApi();  
    await deleteApi.deletePoints({  
      bucket: 'geo_tracking',  
      org: process.env.INFLUX_ORG,  
      start: new Date(0).toISOString(),  
      stop: new Date().toISOString(),  
      predicate: '_measurement="user_location"'  
    });  

    return {  
      statusCode: 200,  
      body: JSON.stringify({ message: 'All tracking data purged' })  
    };  
  } catch (error) {  
    return {  
      statusCode: 500,  
      body: JSON.stringify({ error: error.message })  
    };  
  }  
};  
