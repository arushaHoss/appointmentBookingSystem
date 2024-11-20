var express = require('express');
const router = require('./router');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const db = require('./model'); // Import the database setup

// const { sequelize } = require('./model'); // Correct path to your model folder


var app = express();
app.use(express.json());

app.use('/api', router);

app.listen(PORT, ()=>{ console.log("Listening to the server on http://localhost:3000")});


module.exports = app;