const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://siriusme:s1r1usm3@cluster0-rzzfo.mongodb.net/siriusme?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(express.static('public'));

app.use(express.json());

app.use(require('./src/routes'));

server.listen(process.env.PORT || '4444');