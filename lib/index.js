'use strict';

const path = require('path');
const ERRORS = {
  wrongPath: 'Specify path to module that exports instance(s) of Mongoose.Model',
  wrongImport: 'The specified module should export instance(s) of Mongoose.Model'
}
const jsonSchemaExtention = require('mongoose-schema-jsonschema');

module.exports = exports = processModels;

function processModels(pathToModels, options) {

 try {

    if (!pathToModels) throw new Error(ERRORS.wrongPath);

    if (pathToModels[0] != '/') {
      pathToModels = path.join(process.cwd(), pathToModels);
    }

    let models = require(pathToModels);
    let result;

    if (models instanceof Array) {
      result = __processArray(models);
    } else if (models.constructor.name === 'Object') {
      result = __processKeys(models, options.addId);
    } else {
      result = __processSingle(models);
    }

    if (result instanceof Array && result.length === 1) {
      result = result[0];
    }

    if (options.json) {
      result = JSON.stringify(result, null, '  ');
      console.log(result)
    } else {
      console.dir(result, {depth: null});
    }
  } catch (e) {
    console.error('ERROR: %s', e.message);
  }
}

function __getMongoose(model) {

  let mongoose = model.base;

  if (mongoose.constructor.name !== 'Mongoose') {
    throw new Error(ERRORS.wrongImport);
  };

  return mongoose;

}

function __processSingle(model) {
  const mongoose = __getMongoose(model);
  jsonSchemaExtention(mongoose);
  return model.jsonSchema();

};

function __processArray(models) {

  if (!models.length) return [];

  const mongoose = __getMongoose(models[0]);
  jsonSchemaExtention(mongoose);

  return models.reduce((r, m) => {
    if (m.jsonSchema) r.push(m.jsonSchema());
    return r;
  }, []);
};


function __processKeys(models, addId) {

  let names = Object.keys(models);

  if (!names.length) return [];

  const mongoose = __getMongoose(models[names[0]]);
  jsonSchemaExtention(mongoose);

  let mapper = addId ?
    m => {
      let jS = models[m].jsonSchema();
      if (!jS.id) jS = Object.assign({id: '#'+m.toLowerCase()}, jS);
      return jS
    } :
    m => models[m].jsonSchema();

  return names.reduce( (r, m) => {
    if (models[m].jsonSchema) r.push(mapper(m));
    return r;
  }, []);
}
