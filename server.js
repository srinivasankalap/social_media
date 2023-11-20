// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const imageController = require('./controllers/imageController');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
app.use('/', imageController);

// Sync the models with the database
sequelize.sync().then(() => {
  console.log('Database and tables created!');
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error syncing database:', err);
});
