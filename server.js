const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./config/db');

const shRoutes = require('./routes/sh');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/sneakyhouse', shRoutes);

app.get('/',(req,res) => (
    res.send('Servidor está rodando')
));

const PORT = process.env.PORT || 5000

app.listen(PORT,() => (
    console.log(`Servidor rodando na porta ${PORT}`)
));