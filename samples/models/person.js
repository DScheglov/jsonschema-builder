const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: Date
});

module.exports = exports = mongoose.model('Person', PersonSchema);
