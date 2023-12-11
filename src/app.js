const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 5500;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Zh0ckfd2oo2_',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    res.send(`User ${result.rows[0].username} registered successfully!`);
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
});


app.use((req, res) => {
  res.status(404).send('Page not found');
});
