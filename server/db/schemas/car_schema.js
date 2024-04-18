const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const appointmentModel = new Schema({
  fullName: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  carModel: {
    type: String,
    required: true
  },
  carBrand: {
    type: String,
    required: true
  },
  carYear: {
    type: String,
    required: true
  },
  carType: {
    type: String,
    required: true
  },
  carCapacity: {
    type: String,
    required: true
  },
  carHP: {
    type: String,
    required: true
  },
  carKW: {
    type: String,
    required: true
  },
  carWeight: {
    type: String,
    required: true
  },
  carCIV: {
    type: String,
    required: true
  },
  carVIN: {
    type: String,
    required: true
  },
  carTraction: {
    type: String,
    required: true
  },
  carRegiNr: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  appointmentDateTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "TBApproved"
  },
  inspectionDescription: {
    type: String,
    default : ""
  },
  timer: {
    type: String,
    default: "0"
  }
});
module.exports = mongoose.model('appointment', appointmentModel);