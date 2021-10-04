const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let personSchema = new Schema({
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
        type: Number
    },
    receivedVaccine: {
        type: String
    },
    numChildren: {
        type: String
    },
    elderly: {
        type: String
    },
    veteran: {
        type: String
    },
    ethnicity: {
        type: String
    },
    vaccine: {
        type: String
    },
    preference: {
        type: String
    },
    additionalSupport: {
        type: String
    }

  }, {
      collection: 'person'
});

module.exports = mongoose.model('person', personSchema)