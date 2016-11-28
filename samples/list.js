'use strict';
//list.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountTypes = ['asset', 'liability', 'income', 'expense'];

const AccountSchema = new Schema({
  title: {type: String, required: true},
  accountType: {type: String, required: true, enum: accountTypes},
  balance: {type: Number, required: true}
});

const TransactionSchema = new Schema({
  debit: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
  credit: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
  amount: {type: Number, required: true},
  details: {type: String}
});

module.exports = exports = [
  mongoose.model('Account', AccountSchema),
  mongoose.model('Transaction', TransactionSchema)
];
