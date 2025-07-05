// netlify/functions/delete-data.js
exports.handler = async (event) => {
    const { sessionId } = JSON.parse(event.body);
    
    if (!sessionId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Session ID required" })
        };
    }
    
    // In production: Delete from database
    console.log("Data deletion requested for session:", sessionId);
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: "Data deleted",
            sessionId: sessionId
        })
    };
};
