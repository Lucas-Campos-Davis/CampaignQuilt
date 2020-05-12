const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
let app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

const adventureRouter = require('./routes/adventures');
app.use('/adventures', adventureRouter);


app.listen(8080, () => console.log('server started'));