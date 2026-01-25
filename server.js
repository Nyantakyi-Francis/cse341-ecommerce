const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport configuration
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Load swagger document
const swaggerDocument = require('./swagger-output.json');

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth routes
app.use('/auth', require('./routes/auth'));

// API routes
app.use('/', require('./routes'));

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to database and server is running on port ${port}`);
    });
  }
});