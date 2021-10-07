const express = require("express");
const { Server } = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config({ path: '../.env'});

const server = express(); 

let eventModel = require('./model/event');
let serviceModel = require('./model/service');
let personModel = require('./model/person');
const { resourceLimits } = require("worker_threads");
const { events } = require("./model/event");
const e = require("express");

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connection Success!");
  }).catch((err) => {
    console.error("Mongo Connection Error", err);
});

const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(morgan("dev"));

//Person CRUD
server.post('/person', (req, res, next) => { //Add a person, using full information from a JSON input
    personModel.create(req.body, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send('Added a person');
        }
    });
});
server.get('/person/find-all', (req, res, next) => { //GET all people
    personModel.find((error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
});
server.get('/person/:id', (req, res, next) => { //GET a person by their ID
    personModel.find({personId: req.params.id}, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
});
server.put('/person/:id', (req, res, next) => { //Edit a person by their ID, allowing change of any data with JSON input
    personModel.findOneAndUpdate({ personId: req.params.id}, { $set: req.body }, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send('Person has been edited');
        }
    });
});
server.delete('/person', (req, res, next) => { //Delete a person with matching fields from JSON input
    personModel.findOneAndRemove(req.body, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send('Removed a person');
        }
    });
});

// Person Event CRUD
// TODO: Better Error Handling. Not all error cases are covered. Also this code is a headache to read.
/** 
 * Most of this code came from here:
 * https://dev.to/dance_nguyen/adding-updating-and-removing-subdocuments-with-mongoose-1dj5 
 */
server.put('/person/add-event/:id', (req, res) => { //Add an event to a person using JSON input. Triggered by a successful RSVP.
    personModel.findOne({ personId: req.params.id }, function(err, result) {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            if (!result) {
                res.sendStatus(404).send('Person was not found').end();
            }
            else {
                //Add event to personModel result (a person)
                result.events.push(req.body);
                result.markModified('events'); 
                result.save(function(saveerr, saveresult) {
                if (!saveerr) {
                    res.status(200).send(saveresult);
                } 
                else {
                   res.status(400).send(saveerr.message);
                }

                });
            } 
        } 
    });
});
server.put('/person/get-events/:id', (req, res) => { //Return a list of a persons events 
    personModel.findOne({ personId: req.params.id }).populate('events').exec(function(err, person) {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.json(person.events);
        }
    });
});
/**
 * UPDATE EVENT
 * Requires the use of events subdocument ID 
 * Should only allow updating of auxillary information about the RSVP - eventId should not be changed.
 * If a person wishes to change the eventId they should remove this RSVP and create a new one.
 */
server.put('/person/update-event/:id', (req, res) => { //Update a persons event RSVP using personId param and events doc _id from JSON.
    personModel.findOne({ personId: req.params.id }, function(err, result) {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            if (!result) {
                res.sendStatus(404).send('Person was not found').end();
            }
            else {
                result.events.id(req.body._id).receiveVaccine = req.body.receiveVaccine;
                result.events.id(req.body._id).requireAdditionalSupport = req.body.requireAdditionalSupport;
                result.markModified('events'); 
                result.save(function(saveerr, saveresult) {
                if (!saveerr) {
                    res.status(200).send(saveresult);
                } 
                else {
                   res.status(400).send(saveerr.message);
                }

                });
            } 
        } 
    });
});
server.put('/person/delete-event/:id', (req, res) => { //Delete a persons event RSVP using personId param and events doc _id from JSON.
    personModel.findOne({ personId: req.params.id }, function(err, result) {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            if (!result) {
                res.sendStatus(404).send('Person was not found').end();
            }
            else {
                if(!result.events.id(req.body_id)) {
                    res.status(404).send('Event not found for this person').end();
                    return;
                }
                else {
                    result.events.id(req.body._id).remove(function(removeerr) {
                        if(removeerr) {
                            res.status(400).send(removeerr.message);
                        }
                   });
                }
                result.markModified('events'); 
                result.save(function(saveerr, saveresult) {
                if (!saveerr) {
                    res.status(200).send(saveresult);
                } 
                else {
                   res.status(400).send(saveerr.message);
                }

                });
            } 
        } 
    });
});

//Event CRUD
server.post('/events', (req, res, next) => { //Create an event using JSON input
    eventModel.create(req.body, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send('Added an event');
        }
    });
});
server.get('/events/find-all', (req, res, next) => { //GET all events
    eventModel.find((error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
});
server.get('/events/:id', (req, res, next) => { //GET an event by its ID
    eventModel.find({eventId: req.params.id}, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
});
server.get('/event/services/:id', (req, res, next) => { //GET a service by its ID
    serviceModel.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
});
server.put('/events/:id', (req, res, next) => { //Edit an event by their ID, allowing change of any data with JSON input
    eventModel.findOneAndUpdate({ eventId: req.params.id}, { $set: req.body }, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send('Event has been edited');
        }
    });
});
server.delete('/events', (req, res, next) => { //Delete an event with matching fields from JSON input
    eventModel.findOneAndRemove(req.body, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send('Removed an event');
        }
    });
});

//Services CRUD
server.post('/service', (req, res, next) => { //Add a service using JSON input
    serviceModel.create(req.body, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send('Added a service');
        }
    });
});
server.get('/service/find-all', (req, res, next) => { //Find all services
    serviceModel.find((error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send(data);
        }
    });
});
server.get('/service/:id', (req, res, next) => { //GET a service by its ID
    serviceModel.find({serviceId: req.params.id}, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
});
server.put('/service/:id', (req, res, next) => { //Edit a service by its ID, allowing change of any data with JSON input
    serviceModel.findOneAndUpdate({ eventId: req.params.id}, { $set: req.body }, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send('Service has been edited');
        }
    });
});
server.delete('/service', (req, res, next) => { //Delete a service with matching fields from JSON input. *MAY NOT BE NECESSARY*
    serviceModel.findOneAndRemove(req.body, (error, data) => {
        if(error) {
            return next(error);
        }
        else {
            res.send('Removed a service');
        }
    });
});

//Server Stuff
server.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});
server.use(function(err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) 
        err.statusCode = 500
    res.status(err.statusCode).send(err.message);
});
