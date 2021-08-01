const express = require('express');
const consign = require('consign');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.webUrl, credentials: true }));
app.set('jwt', jwt);

consign({ cwd: 'src' })
 .include('resources')
 .then('models')
 .then('controllers')
 .then('routes')
 .into(app)

app.listen(8000, function () { 
})