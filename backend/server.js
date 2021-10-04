const express = require("express");
const { Server } = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config({ path: '../.env'});

const server = express(); 

let eventModel = require('./model/event');
let serviceModel = require('./model/service');
//let personModel = require('./model/person');

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connection Success!");
  }).catch((err) => {
    console.error("Mongo Connection Error", err);
});

const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(morgan("dev"));

server.post('/service', (req, res, next) => {
    serviceModel.create(req.body, (error, data) => {
        if(error) {
            return next(error)
        }
        else {
            res.send('Added a service');
        }
    });
});
server.delete('/service', (req, res, next) => {
    serviceModel.findOneAndRemove(req.body, (error, data) => {
        if(error) {
            return next(error)
        }
        else {
            res.send('Removed a service');
        }
    });
});

server.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});
server.use(function(err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) 
        err.statusCode = 500
    res.status(err.statusCode).send(err.message);
});