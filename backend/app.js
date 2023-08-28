const express = require('express');
const bodyParser = require("body-parser")
const mongoose =require('mongoose');

const userRoutes = require("./routes/user");

const app=express();

mongoose.connect("mongodb+srv://ghazel:3hZs1QJHe4GZm3BY@freenerty.fjsjba3.mongodb.net/?retryWrites=true&w=majority")
  .then(()=>{
    console.log('Connected to db')
  })
  .catch(()=>{
    console.log('ahah');
  });

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});




app.use("/api/user",userRoutes);

module.exports = app;
