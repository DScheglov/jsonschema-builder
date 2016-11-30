'use strict';

const assert = require('assert');
const processModels = require('../index');

describe('Directory support: processModels', function() {

  it('with option `--dir` should process directory', function() {
    let output = processModels('samples/models', {dir: true});

    assert.deepEqual(output, [
      {
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
      }, {
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
      }
    ]);
  });

  it('with option `--dir` should process directory without sub-directories', function() {
    let output = processModels('samples', {dir: true, recursive: false});

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
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
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
      }, {
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
    ]);
  });

  it('with options `--dir` and `--recursive` should process directory with sub-directories', function() {
    let output = processModels('samples', {dir: true, recursive: true});

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
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
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
      }, {
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
      }, {
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
      }, {
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
    ]);
  });

});
