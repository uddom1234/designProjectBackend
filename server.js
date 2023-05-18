const express = require('express');
const cors = require('cors');

// Initiating the server
const app = express();


const port = 4000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

const mysql = require('mysql2/promise');
const mainRoute = require('./route/insertEnd');
const highScoreRoute = require('./route/highScores');

// create the connection to database
const connection = mysql.createPool({
  host: 'feenix-mariadb.swin.edu.au',
  user: 's103624995',
  password: '070300',
  database: 's103624995_db',
  waitForConnections: true,
});

app.get('/', (req, res) => {
  res.status(200).send('Server is running!');
});

app.use('/api', mainRoute(connection));
app.use('/highscore', highScoreRoute(connection));
app.use('/round', require('./route/round')(connection));
app.use('/archer', require('./route/archer')(connection));
app.use('/competition', require('./route/competition')(connection));

app.listen(port, () => console.log(`Listening on port ${port}...`));
