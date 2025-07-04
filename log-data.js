exports.handler = async (event) => {
  const trackingData = JSON.parse(event.body);
  console.log("📍 Tracking Data:", trackingData);
  
  // Optional: Store in Firebase/Airtable here
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "Data logged" })
  };
};
