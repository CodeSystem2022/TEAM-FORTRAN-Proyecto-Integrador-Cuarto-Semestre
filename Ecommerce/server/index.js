const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRoute = require('./router/authRoute');
const { notFound, errorHandler } = require('./middleware/errorHandler');

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', authRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('server is running at port', PORT);
});