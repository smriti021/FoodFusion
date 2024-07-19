const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/OrderData');
const app = express();
const port = 4500;
const mongoDB=require("./db");
mongoDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


//app.use(express.json());
app.use('/api',require('./routes/CreateUser'));
app.use('/api',require('./routes/DisplayData'));
app.use('/api',require('./routes/OrderData'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

module.exports = app; //express.Router 
