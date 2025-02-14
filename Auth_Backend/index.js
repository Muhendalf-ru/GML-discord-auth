require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/index');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});

    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
