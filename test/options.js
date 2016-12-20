'use strict';

const assert = require('assert');
const processModels = require('../index');

describe('Options: processModels', function() {

  it ('with `--json` option should return json-formatted schema', function () {
    let output = processModels('samples/models/book', {json: true});
    assert.deepEqual(JSON.parse(output), {
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
    })
  });

  it ('with `--noid` should return schema without id field', function() {
    let output = processModels('samples/models/book', {noid: true});
    assert.ok(!('id' in output));
    assert.equal(typeof output.id, 'undefined');
  });

});
