const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
require('dotenv').config();
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

const userRoutes = require('./routes/userRoutes')


app.use('/', userRoutes)

app.listen(3000, () => {
    console.log('listening on port 3000');
})