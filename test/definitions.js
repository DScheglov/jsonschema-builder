'use strict';

const assert = require('assert');
const processModels = require('../index');

describe('Definitions support: processModels', function() {

  it('with option `--object-def` should return object `definitions`', function() {
    let output = processModels('samples/models/book', {objectDef: true});
    assert.deepEqual(output, {
      book: {
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
            format: 'uuid',
            pattern: '^[0-9a-fA-F]{24}$'
          },
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        },
        required: [ 'title', 'author' ]
      }
    });
  });


  it('with options `--objectDef` `--dir` and `--recursive` should process directory with sub-directories', function() {
    let output = processModels('samples', {
      dir: true,
      recursive: true,
      objectDef: true
    });

    assert.deepEqual(output, {
      account: {
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
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        },
        required: [ 'title', 'accountType', 'balance' ]
      },
      transaction: {
        id: '#transaction',
        title: 'Transaction',
        type: 'object',
        properties: {
          debit: {
            type: 'string',
            'x-ref': 'Account',
            description: 'Refers to Account',
            format: 'uuid',
            pattern: '^[0-9a-fA-F]{24}$'
          },
          credit: {
            type: 'string',
            'x-ref': 'Account',
            description: 'Refers to Account',
            format: 'uuid',
            pattern: '^[0-9a-fA-F]{24}$'
          },
          amount: { type: 'number' },
          details: { type: 'string' },
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        },
        required: [ 'debit', 'credit', 'amount' ]
      },
      book: {
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
            format: 'uuid',
            pattern: '^[0-9a-fA-F]{24}$'
          },
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        },
        required: [ 'title', 'author' ]
      },
      person: {
        id: '#person',
        title: 'Person',
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          dateOfBirth: { type: 'string', format: 'date-time' },
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        },
        required: [ 'firstName', 'lastName' ]
      },
      point: {
        id: '#point',
        title: 'Point',
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
          title: { type: 'string' },
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        }
      },
      line: {
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
              _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
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
              _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
              __v: { type: 'number' }
            }
          },
          title: { type: 'string' },
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        }
      }
    });
  });

});
