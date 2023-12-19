//activity gets logged to the acess.log file
const log = require('morgan');
const file = require('path');

const express = require('express')
//here we have implemented helmet for browser protection 
const helmetprotect = require('helmet')
const app = express()
const urlprefix = '/api'
const mongoose = require("mongoose")

const fs = require('fs');
//here we call the ssl certifcates
const cert = fs.readFileSync('keys/certificate.pem');
const options = { server:{sslCA:cert}};
const constring = 'add your own key here'
const taskroutes = require("./routes/tasks")
const userroutes = require("./routes/user")
app.use(helmetprotect());
const accessLogStream = fs.createWriteStream(file.join(__dirname, 'access.log'), { flags: 'a' });

app.use(log('combined', { stream: accessLogStream }));

mongoose.connect(constring)
.then(()=>
{
  console.log('conntected')
})
.catch(()=>
{
  console.log('not connected')
},options);

app.use(express.json())
//here we set cors for the protections 
app.use((reg,res,next)=> { res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization'); res.setHeader('Access-Control-Allow-Methods', '*'); next(); });
//calling routes 
app.use(urlprefix+'/tasks',taskroutes)
app.use(urlprefix+'/users',userroutes )

  module.exports = app;
  
