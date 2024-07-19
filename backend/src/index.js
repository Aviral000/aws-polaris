const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const passport = require("passport");
const configPassport = require("./config/passport");

const { MongoDB, Server } = require('./config/config');
const userRouter = require('./routes/user.route');

const app = express();

app.use(cors());

configPassport(passport);

app.use(express.json());

mongoose.connect(MongoDB.url, MongoDB.options)
    .then(() => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log("DB discontinued", err);
    })

app.use('/u1/api', userRouter);

app.listen(Server.port, () => {
    console.log(`Server is running on ${Server.port}`)
})