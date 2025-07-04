exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  console.log("📡 Tracking Data:", data);
  return { statusCode: 200, body: "OK" };
};
