'use strict';

const path = require('path');
const ERRORS = {
  wrongPath: 'Specify path to module that exports instance(s) of Mongoose.Model',
  wrongImport: 'The specified module should export instance(s) of Mongoose.Model'
}

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
      result = __processKeys(models);
    } else {
      result = __processSingle(models);
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

  require('mongoose-schema-jsonschema')(
    __getMongoose(model)
  );
  return model.jsonSchema();

};

function __processArray(models) {

  if (!models.length) return [];

  require('mongoose-schema-jsonschema')(
    __getMongoose(models[0])
  );

  return models.map(m => m.jsonSchema());
};


function __processKeys(models) {

  let names = Object.keys(models);

  if (!names.length) return [];

  require('mongoose-schema-jsonschema')(
    __getMongoose(models[names[0]])
  );

  return names.map(m => Object.assign({id: '$'+m}, models[m].jsonSchema()));
}
