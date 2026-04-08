const https = require('https');
const axios = require('axios');

// Using axios, ignoring self-signed certificate for the sake of demo
const agent = new https.Agent({
  rejectUnauthorized: false
});

async function makeRequest() {
  console.log('Client: Sending standard HTTPS request to the PQC Gateway...');
  try {
    const response = await axios.get('https://localhost:4433/api/data', { httpsAgent: agent });
    console.log('Client: Response received successfully.');
    console.log('\nClient: Response payload:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Client Error:', error.message);
  }
}

makeRequest();
