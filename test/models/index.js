'use strict';

const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const aSchema = ({
  title: String,
  data: Schema.Types.Mixed
});

module.exports = exports = {
  modelMixed: mongoose.model('modelMixed', aSchema),
  the_model_mixed: mongoose.model('the_model_mixed', aSchema),
  MixedModel: mongoose.model('MixedModel', aSchema)
}
