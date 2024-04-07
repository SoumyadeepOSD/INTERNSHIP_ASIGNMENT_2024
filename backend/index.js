const express = require('express');
const userRoutes = require('./routes/userRoute.js');
const dbConnect = require("./dbconfig/connectDB.js");
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(express.json());
app.use(cors(
  {
    origin: ['http://localhost:3000'],
  }
))
app.use(express.urlencoded({ extended: true }));
dbConnect();

app.use('/auth', userRoutes);

// -------------DEPLOYMENT-------------
// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname1,"/frontend/build")));

//     app.get("*", (req, res)=>{
//         res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
//     })
// }else{
//     app.get("/", (req, res) => {
//         console.log("Hello World");
//     });    
// }
app.get("/", (req, res)=>console.log("Hello World"));

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
