const express = require('express');

// Initiating the server
const app = express();


const port = 4000;

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'feenix-mariadb-web.swin.edu.au',
  user: 's103624995',
  password: '070300',
  database: 's103624995_db'
});


app.get('/', (req, res) => {

  if(connection) {
    res.status(200).send('Database Connected!');
  } else {
    res.status(500).send('Database Not Connected!');
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
