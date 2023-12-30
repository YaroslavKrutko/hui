//const express = require('express');
//const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
//const { Pool } = require('pg');

//const app = express();
//const port = 5500;

//const pool = new Pool({
//  user: 'postgres',
 // host: 'localhost',
 // database: 'postgres',
 // password: 'Zh0ckfd2oo2_',
 // port: 5432,
//});

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//app.use(express.static('public'));

//app.listen(port, () => {
  //console.log(`Server is running on port ${port}`);
//});



//app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/public/index.html');
//});

//app.post('/register', async (req, res) => {
  //const { username, password } = req.body;

   //try {
        //const hashedPassword = await bcrypt.hash(password, 10);
        //const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
      //  res.json({ success: true, user: result.rows[0] });
    //} catch (error) {
      //  console.error(error);
    //    res.status(500).json({ success: false, error: 'Registration failed' });
  //  }
//});

//app.post('/login', async (req, res) => {
    //const { username, password } = req.body;

   // try {
        //const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        //const user = result.rows[0];

        //if (!user) {
        //    return res.status(401).json({ success: false, error: 'Invalid credentials' });
        //}

        //const match = await bcrypt.compare(password, user.password);

       // if (match) {
           // return res.json({ success: true, user: user });
       // } else {
           // return res.status(401).json({ success: false, error: 'Invalid credentials' });
       // }
    //} catch (error) {
       // console.error(error);
       // res.status(500).json({ success: false, error: 'Login failed' });
   // }
//});


//app.use((req, res) => {
  //res.status(404).send('Page not found');
//});

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const port = 5500;

const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
};

const pool = new Pool(databaseConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML and CSS
app.use(express.static('public'));

// Registration route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        res.json({ success: true, user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Registration failed' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return res.json({ success: true, user: user });
        } else {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Login failed' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
