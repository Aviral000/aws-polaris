const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const { MongoDB, Server } = require('./config/config');

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(MongoDB.url, MongoDB.options)
    .then(() => {
        console.log("DB is connected");
    })
    .catch(() => {
        console.log("DB discontinued");
    })

app.listen(Server.port, () => {
    console.log(`Server is running on ${Server.port}`)
})