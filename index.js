const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const router = require('./app/router');

const cors = require('cors');
const multer = require('multer');
const bodyParser = multer();

const PORT = process.env.PORT || 3000;

// pour contrôler qui peut contacter l'API
app.use(cors('*'));

// rend disponibles les données envoyées par l'utilisateur, via req.body
app.use(express.urlencoded({
  extended: true
}));

app.use(bodyParser.none());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});