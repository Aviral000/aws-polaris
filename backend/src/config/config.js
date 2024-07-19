require('dotenv').config();

const MongoDB = {
    url: process.env.MONGO_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
    }
}

const Server = {
    port: process.env.PORT_NUMBER
};

const Token_Key = {
    Private_key: process.env.SECRET_KEY
}

module.exports = { MongoDB, Server, Token_Key }