const app = require('./server');

// Test the server setup
console.log('Testing server configuration...');

// Test environment variables
console.log('Environment variables:');
console.log('- PORT:', process.env.PORT);
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- HF_API_KEY:', process.env.HF_API_KEY ? 'Set' : 'Not set');

// Test module loading
console.log('\nTesting module loading:');
try {
  const express = require('express');
  const cors = require('cors');
  const helmet = require('helmet');
  console.log('✅ All core modules loaded successfully');
} catch (error) {
  console.log('❌ Module loading failed:', error.message);
}

// Test route handlers
console.log('\nTesting route handlers:');
try {
  const diagramRoutes = require('./routes/diagram');
  const exportRoutes = require('./routes/export');
  console.log('✅ Route modules loaded successfully');
} catch (error) {
  console.log('❌ Route module loading failed:', error.message);
}

// Test services
console.log('\nTesting services:');
try {
  const huggingfaceService = require('./services/huggingfaceService');
  const exportService = require('./services/exportService');
  console.log('✅ Service modules loaded successfully');
} catch (error) {
  console.log('❌ Service module loading failed:', error.message);
}

console.log('\nServer test completed. To start the server:');
console.log('1. Set your Hugging Face API key in backend/.env');
console.log('2. Run: cd backend && npm start');
console.log('3. The server will start on http://localhost:5000');
