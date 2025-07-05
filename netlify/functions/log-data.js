// netlify/functions/log-data.js
exports.handler = async (event) => {
    // Parse incoming data
    const data = JSON.parse(event.body);
    
    // Simple validation
    if (!data.sessionId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing session ID" })
        };
    }
    
    // In production: Store data to Airtable/Database
    // For now, log to console
    console.log("Tracking data received:", {
        sessionId: data.sessionId,
        interactions: data.interactions.length,
        location: data.location,
        device: data.device
    });
    
    return {
        statusCode: 200,
        body: JSON.stringify({ 
            status: "Data logged",
            sessionId: data.sessionId
        })
    };
};
