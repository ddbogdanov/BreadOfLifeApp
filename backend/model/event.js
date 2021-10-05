const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    eventId: {
        type: Number,
        required: true
    },
    name: {
        type: String
    },
    services: {
        type: [String] //Stores service document IDs to represent services offered at the event.
        /**
         * TODO: Currently this is a very loose relationship - if a service is deleted there is no way to see what it was. 
         * Should think about a solution to this.
         */
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

autoIncrement.initialize(mongoose.connection);
eventSchema.plugin(autoIncrement.plugin, {model: 'event', field: 'eventId'});
var Counter = mongoose.model('event', eventSchema)
module.exports = mongoose.model('event', eventSchema)