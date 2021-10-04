const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let serviceSchema = new Schema({
    serviceName: {
        type: String
    },
    description: {
        type: String
    }
  }, {
      collection: 'services'
});

module.exports = mongoose.model('service', serviceSchema)
