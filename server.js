const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./config/db');

const shRoutes = require('./routes/sh');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/sneakyhouse', shRoutes);
app.use('/api/auth', authRoutes);

app.get('/',(req,res) => (
    res.send('Servidor está rodando')
));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

const PORT = process.env.PORT || 5000

app.listen(PORT,() => (
    console.log(`Servidor rodando na porta ${PORT}`)
));