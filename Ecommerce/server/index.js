const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRoute = require('./router/authRoute');

dbConnect();

app.use('/', (req, res) => {
    res.send("hello from server")
});

app.use('/api/user', authRoute);

app.listen(PORT, () => {
    console.log('server is running at port', PORT);
});