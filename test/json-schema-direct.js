'use strict';

const assert = require('assert');
const mongoose = require('mongoose');
const jsonSchemaBuilder = require('../');
jsonSchemaBuilder.extendMongoose(mongoose);

const Book = require('../samples/models/book');

describe('.jsonSchema()', function() {

  it ('should be accessible without direct import', function() {
    let jsonSchema = Book.jsonSchema();
    assert.deepEqual(jsonSchema, {
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

})
