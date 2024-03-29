const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')


const keysRoutes = require('./routes/keys')
const userRoutes = require('./routes/user')

const app = express();

require('dotenv').config();

MONGODBURI = process.env.MONGODB_URI_LOCAL;

mongoose.connect(MONGODBURI).then(() => {
  console.log('Connected to database.' + MONGODBURI)
})
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use("/api/keys", keysRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
