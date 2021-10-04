const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    name: {
        type: String
    },
    services: {
        type: [String]
    },
    location: {
        type: String
    },
    date: {
        type: Date
    }
  }, {
    collection: 'events'
});

module.exports = mongoose.model('event', eventSchema)