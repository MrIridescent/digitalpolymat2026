/**
 * 🧪 Netlify Function for Webhook Testing
 * Tests notification system functionality
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
      const testData = JSON.parse(event.body);
      
      console.log('🧪 Webhook test received:', testData);
      
      // Simulate notification processing
      const response = {
        success: true,
        message: 'Webhook test successful',
        timestamp: new Date().toISOString(),
        data: testData,
        environment: 'production',
        function: 'netlify-webhook-test'
      };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response)
      };
      
    } catch (error) {
      console.error('❌ Webhook test error:', error);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Webhook test failed',
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
        message: 'Webhook test endpoint is active',
        timestamp: new Date().toISOString(),
        environment: 'production'
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
