'use strict';

const assert = require('assert');
const helpers = require('../lib/helpers');

describe('formatId', function() {

  it('(\'_\', \'modelName\') should return model_name', function(){
    assert.equal(helpers.formatId('_', 'modelName'), 'model_name');
  });

  it('(\'-\', \'modelName\') should return model-name', function(){
    assert.equal(helpers.formatId('-', 'modelName'), 'model-name');
  });

  it('(null, \'modelName\') should return model-name', function(){
    assert.equal(helpers.formatId(null, 'modelName'), 'model-name');
  });

  it('(\'\', \'\') should return \'\'', function(){
    assert.equal(helpers.formatId('', ''), '');
  });

});

describe('camel', function() {

  it('(\'model_name\') should return modelName', function(){
    assert.equal(helpers.camel('model_name'), 'modelName');
  });

  it('(\'model-name\') should return model-name', function(){
    assert.equal(helpers.camel('model-name'), 'modelName');
  });

  it('(\'ModelName\') should return model-name', function(){
    assert.equal(helpers.camel('ModelName'), 'modelName');
  });

  it('(null) should return model-name', function(){
    assert.equal(helpers.camel(null), '');
  });



});
