require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const url = process.env.MONGO_URL;
const connect = mongoose.connect(url);

connect.then((db) =>{
  console.log(' Connected to server'+db);
}, (err) => {console.log(err);});

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterList: 5000 }));

var treeRouter = require('./routes/tree');
app.use('/tree', treeRouter);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('HTTP server is running at ', port);
});