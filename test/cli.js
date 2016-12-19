'use strict';

const assert = require('assert');
const child_process = require('child_process');

describe('node index', function (done) {

  it('should process ./models', function(done) {
    child_process.exec('node index test/models', function(err, stdout, stderr) {
      assert.ok(!err);
      assert.equal(stderr, '');

      let out = eval(stdout);
      assert.deepEqual(out, [{
        id: '#model-mixed',
        title: 'modelMixed',
        type: 'object',
        properties: {
          title: { type: 'string' },
          data: { type: 'mixed' },
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        }
      }, {
        id: '#the-model-mixed',
        title: 'the_model_mixed',
        type: 'object',
        properties: {
          title: { type: 'string' },
          data: { type: 'mixed' },
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        }
      }, {
        id: '#mixed-model',
        title: 'MixedModel',
        type: 'object',
        properties: {
          title: { type: 'string' },
          data: { type: 'mixed' },
          _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
          __v: { type: 'number' }
        }
      }]);

      done();
    });
  });

});
