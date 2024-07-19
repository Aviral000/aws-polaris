require('dotenv').config();

const MongoDB = {
    url: process.env.MONGO_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        poolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
    }
}

const Server = {
    port: process.env.PORT_NUMBER
};

module.exports = { MongoDB, Server }