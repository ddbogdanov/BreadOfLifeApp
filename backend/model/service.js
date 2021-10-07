const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema;

let serviceSchema = new Schema({
    serviceId: {
        type: Number,
        required: true
    },
    serviceName: {
        type: String
    },
    description: {
        type: String
    }
  }, {
      collection: 'services'
});

autoIncrement.initialize(mongoose.connection);
serviceSchema.plugin(autoIncrement.plugin, {model: 'service', field: 'serviceId'});
var Counter = mongoose.model('service', serviceSchema)
module.exports = mongoose.model('service', serviceSchema)
