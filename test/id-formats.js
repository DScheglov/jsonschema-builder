'use strict';

const assert = require('assert');
const processModels = require('../index');

describe('ID-formats: processModels', function() {

  it('with `--id camel` should add id in camelStyle', function() {
    let output = processModels('test/models', { id: 'camel', objectDef: true });

    for (let id of ['modelMixed', 'theModelMixed', 'mixedModel']) {
      assert.equal(output[id].id, '#' + id);
    }

  });

  it('with `--id dash` should add id in dash-style', function() {
    let output = processModels('test/models', { id: 'dash', objectDef: true });

    for (let id of ['model-mixed', 'the-model-mixed', 'mixed-model']) {
      assert.equal(output[id].id, '#' + id);
    }

  });

  it('with `--id underline` should add id in underline_style', function() {
    let output = processModels('test/models', { id: 'underline', objectDef: true });

    for (let id of ['model_mixed', 'the_model_mixed', 'mixed_model']) {
      assert.equal(output[id].id, '#' + id);
    }

  });

  it('with `--id lower` should add id in lowercase', function() {
    let output = processModels('test/models', { id: 'lower', objectDef: true });

    for (let id of ['modelmixed', 'the_model_mixed', 'mixedmodel']) {
      assert.equal(output[id].id, '#' + id);
    }

  });

});
