require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
// * Variables
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const middleware = require('./middleware/middlware.js');
const auth = require('./controllers/authController.js');
const app = express();

// * Middleware
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then( db => {
    app.set('db', db);
    console.log('DB connected')
})

// * Endpoints
app.post('/auth/register', middlware.checkEmail, auth.register);

app.listen(SERVER_PORT, () => console.log(`Yo! Up and running on port ${SERVER_PORT}`))