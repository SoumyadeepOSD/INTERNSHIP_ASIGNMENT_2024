const express = require('express');
const userRoutes = require('./routes/userRoute.js');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;

const dbConnect = require("./dbconfig/connectDB.js");

dbConnect();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to nodjs server');
})

app.use('/auth', userRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
