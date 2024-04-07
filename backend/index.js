const express = require('express');
const userRoutes = require('./routes/userRoute.js');
const dbConnect = require("./dbconfig/connectDB.js");
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(
  {
    origin: ['http://localhost:3000'],
  }
))
app.use(express.urlencoded({ extended: true }));
dbConnect();

app.use('/auth', userRoutes);

app.get("/", (req, res)=>{
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
