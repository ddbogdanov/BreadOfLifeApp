const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema;

let personSchema = new Schema({
    personId: {
        type: Number,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    zipCode: {
        type: String
    },
    receivedVaccine: {
        type: Boolean
    },
    numChildren: {
        type: Number
    },
    elderly: {
        type: Boolean
    },
    veteran: {
        type: Boolean
    },
    ethnicity: {
        type: String
    },

    events: [{
        eventId: {
            type: String, // for now maybe a string
            required: true
        },
        receiveVaccine: {
            type: Boolean
        },
        vaccinePreference: {
            type: String
        },
        requireAdditionalSupport: {
            type: String
        }
    }]

  }, {
      collection: 'person'
});


autoIncrement.initialize(mongoose.connection);
personSchema.plugin(autoIncrement.plugin, {model: 'person', field: 'personId'});
var Counter = mongoose.model('person', personSchema)
module.exports = mongoose.model('person', personSchema);