const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: true  
 }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
