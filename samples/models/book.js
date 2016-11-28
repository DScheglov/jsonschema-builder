'use strict';
// book.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {type: String, required: true},
  year: Number,
  author: {type: Schema.Types.ObjectId, required: true, ref: 'Person'}
});

module.exports = exports = mongoose.model('Book', BookSchema);
