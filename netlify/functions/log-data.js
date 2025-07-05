// netlify/functions/log-data.js
exports.handler = async (event) => {
  // 1. Handle empty requests
  if (!event.body || event.httpMethod !== 'POST') {
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        status: "awaiting_data",
        hint: "Send POST requests with JSON body" 
      })
    };
  }

  // 2. Safe JSON parsing
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "invalid_json",
        message: "Send valid JSON in request body"
      })
    };
  }

  // 3. Validate required fields
  if (!data.sessionId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "missing_field",
        required: ["sessionId"]
      })
    };
  }

  // 4. Process valid data (example logging)
  console.log("📡 Tracking data received:", {
    sessionId: data.sessionId,
    interactions: data.interactions?.length || 0,
    timestamp: new Date().toISOString()
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      status: "success",
      sessionId: data.sessionId 
    })
  };
};
