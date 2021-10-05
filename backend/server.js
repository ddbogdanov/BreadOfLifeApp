const express = require("express");
const { Server } = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config({ path: '../.env'});

const server = express(); 

let eventModel = require('./model/event');
let serviceModel = require('./model/service');
let personModel = require('./model/person');

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connection Success!");
  }).catch((err) => {
    console.error("Mongo Connection Error", err);
});

const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(morgan("dev"));

//Add and Delete services. Temporary probably we'll need something a bit more complex probably i dunno.
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


server.get('/person/:id', (req, res, next) => {
    personModel.find({personId: req.params.id}, (error, data) => {
        if(error) {
            return next(error)
        }
        else {
            res.json(data);
        }
    });
});
server.post('/person', (req, res, next) => {
    personModel.create(req.body, (error, data) => {
        if(error) {
            return next(error)
        }
        else {
            res.send('Added a person')
        }
    });
});
server.delete('/person', (req, res, next) => {
    personModel.findOneAndRemove(req.body, (error, data) => {
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
