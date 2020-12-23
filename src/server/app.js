const express = require('express');
const bodyParser = require('body-parser');
const port = 3001;
const connect = require('./schemas');
const rank = require('./routes/rank');
const users = require('./routes/users');

const app = express();

connect();

app.use(bodyParser.json());
app.use('/api/rank', rank);
app.use('/api/users', users);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})