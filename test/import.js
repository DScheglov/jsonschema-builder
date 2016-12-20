'use strict';

const assert = require('assert');
const processModels = require('../index');
const options = {};

describe('Import: processModels', function() {

  it('should process import of single model', function() {
    let output = processModels('samples/models/book', options);
    assert.deepEqual(output, {
      id: '#book',
      title: 'Book',
      type: 'object',
      properties: {
        title: { type: 'string' },
        year: { type: 'number' },
        author: {
          type: 'string',
          'x-ref': 'Person',
          description: 'Refers to Person',
          pattern: '^[0-9a-fA-F]{24}$'
        },
        _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
        __v: { type: 'number' }
      },
      required: [ 'title', 'author' ]
    });
  });

  it('should process import of array of models', function() {

    let output = processModels('samples/list', options);
    assert.deepEqual(output, [
      {
        id: '#account',
        title: 'Account',
        type: 'object',
        properties: {
          title: { type: 'string' },
          accountType: {
            type: 'string',
            enum: [ 'asset', 'liability', 'income', 'expense' ]
          },
          balance: { type: 'number' },
          _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        },
        required: [ 'title', 'accountType', 'balance' ]
      }, {
        id: '#transaction',
        title: 'Transaction',
        type: 'object',
        properties: {
          debit: {
            type: 'string',
            'x-ref': 'Account',
            description: 'Refers to Account',

            pattern: '^[0-9a-fA-F]{24}$'
          },
          credit: {
            type: 'string',
            'x-ref': 'Account',
            description: 'Refers to Account',

            pattern: '^[0-9a-fA-F]{24}$'
          },
          amount: { type: 'number' },
          details: { type: 'string' },
          _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        },
        required: [ 'debit', 'credit', 'amount' ]
      }
    ]);

  });

  it('should process import array of models but return single schema if array contains only one model', function() {
    let output = processModels('test/models/list-of-one-model', options);
    assert.deepEqual(output, {
      id: '#book',
      title: 'Book',
      type: 'object',
      properties: {
        title: { type: 'string' },
        year: { type: 'number' },
        author: {
          type: 'string',
          'x-ref': 'Person',
          description: 'Refers to Person',

          pattern: '^[0-9a-fA-F]{24}$'
        },
        _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
        __v: { type: 'number' }
      },
      required: [ 'title', 'author' ]
    });
  });

  it('should import key-array of models', function() {
    let output = processModels('samples/models', {dir: false});

    assert.deepEqual(output, [
      {
        id: '#point',
        title: 'Point',
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
          title: { type: 'string' },
          _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        }
      }, {
        id: '#line',
        title: 'Line',
        type: 'object',
        properties: {
          start: {
            title: 'start',
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              title: { type: 'string' },
              _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
              __v: { type: 'number' }
            }
          },
          end: {
            title: 'end',
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              title: { type: 'string' },
              _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
              __v: { type: 'number' }
            }
          },
          title: { type: 'string' },
          _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        }
      }
    ]);

  });

});
