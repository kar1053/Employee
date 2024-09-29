// config/db.js
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Configure PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'employee_management',
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if a connection cannot be established
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connected successfully');
    release(); // Release the client back to the pool
  }
});

module.exports = pool;
