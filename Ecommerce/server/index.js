const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRoute = require('./router/authRoute');
const { notFound, errorHandler } = require('./middleware/errorHandler');

app.use(express.static('../src'));

// Define una ruta para el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', authRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('server is running at port', PORT);
});