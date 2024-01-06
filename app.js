const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require("./routes/index")
require('dotenv/config');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.json());
app.use(router);

mongoose.connect(
    process.env.CONNECTION_STRING, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

process.on('uncaughtException', (err) => {
    console.log(err);
});

app.listen(3001, ()=>{
    console.log('server is running on port 3001');
})