const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoute.js');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const dbConnect = require("./dbconfig/connectDB.js");

dbConnect();

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Node.js server');
})

app.use('/auth', userRoutes);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// For all other requests, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
