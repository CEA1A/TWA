exports.handler = async (event) => {
  // 1. Handle empty requests
  if (!event.body) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: "No data received" })
    };
  }

  // 2. Safe JSON parsing
  let trackingData;
  try {
    trackingData = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" })
    };
  }

  // 3. Log successfully parsed data
  console.log("✅ Valid tracking data:", trackingData);
  return { statusCode: 200 };
};
