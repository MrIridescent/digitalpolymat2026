/**
 * 🚀 Netlify Function for Lead Processing
 * Handles lead submissions and notifications
 */

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const leadData = JSON.parse(event.body);
      
      console.log('📧 Lead received via Netlify Function:', leadData);
      
      // Here you would integrate with your notification service
      // For now, we'll just log and return success
      
      // In production, you would:
      // 1. Validate the lead data
      // 2. Send notifications via email/SMS
      // 3. Store in database
      // 4. Trigger follow-up workflows
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Lead processed successfully',
          leadId: `lead_${Date.now()}`
        })
      };
      
    } catch (error) {
      console.error('❌ Lead processing error:', error);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Failed to process lead',
          error: error.message
        })
      };
    }
  }

  // Handle GET requests
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Lead processing endpoint is active',
        timestamp: new Date().toISOString()
      })
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({
      message: 'Method not allowed'
    })
  };
};
