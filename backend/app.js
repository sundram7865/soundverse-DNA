import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dnaRoutes from './routes/dnaRoutes.js';
import sequelize from './config/db.js';

dotenv.config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_PROD_URL 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS middleware first
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes
app.use(express.json());

// Routes
app.use('/api/artists', dnaRoutes);

// Health endpoints
app.get('/', (req, res) => {
  res.json({ 
    message: 'Soundverse API is running',
    endpoints: {
      artists: '/api/artists',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    database: sequelize.authenticate() ? 'connected' : 'disconnected'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Database and server startup
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API Docs: http://localhost:${PORT}`);
      console.log(`CORS allowed for: ${corsOptions.origin}`);
    });
  })
  .catch(err => {
    console.error('Server startup failed:', err);
    process.exit(1);
  });

export default app;