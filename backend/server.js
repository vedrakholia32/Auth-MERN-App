const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
require('dotenv').config();
app.use(cors({origin: 'http://localhost:3001', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

const userRoutes = require('./routes/userRoutes')


app.use('/', userRoutes)

app.listen(3000, () => {
    console.log('listening on port 3000');
})