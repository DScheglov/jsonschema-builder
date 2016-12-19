'use strict';

const assert = require('assert');
const requireDir = require('../lib/helpers').requireDir;
const processModels = require('../lib');
const ERRORS = require('../lib/errors');

describe('Wrong path: requireDir', function() {

  it('should raise an Exception if path doesn\'t exist', function() {

    assert.throws( () => {
      requireDir('models/models.js')
    }, Error)

  });

});


describe('processModels', function () {

  it('should return ERROR message if no path specified', function() {
    assert.throws( () => {
      processModels()
    }, function(err) {
      assert.equal(err.message, ERRORS.wrongPath);
      return true;
    });
  });

  it('should return ERROR message if no model imported', function() {
    assert.throws( () => {
      processModels('samples/sub-dir/some-file');
    }, function(err) {
      assert.equal(err.message, ERRORS.wrongImport);
      return true;
    });
  });

})
