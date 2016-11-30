'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PointSchema = new Schema({
  x: Number,
  y: Number,
  title: String
});

const LineSchema = new Schema({
  start: PointSchema,
  end: PointSchema,
  title: String
})

module.exports = exports = {
  Point: mongoose.model('Point', PointSchema),
  Line: mongoose.model('Line', LineSchema)
}
