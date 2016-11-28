'use strict';

const path = require('path');
const colors = require('colors');
const jsonSchemaExtention = require('mongoose-schema-jsonschema');
const helpers = require('./helpers');

const requireDir = helpers.requireDir;

const ERRORS = {
  wrongPath: 'Specify path to module that exports instance(s) of Mongoose.Model',
  wrongImport: 'The specified module should export instance(s) of Mongoose.Model.'+
               ' Or specified directory should contain at least one such module.'
}

module.exports = exports = processModels;

function processModels(pathToModels, options) {

  let models, result;

  //try {

    if (!pathToModels) throw new Error(ERRORS.wrongPath);

    options.id = __id_mapper(options.id);

    if (pathToModels[0] != '/') {
      pathToModels = path.join(process.cwd(), pathToModels);
    }

    if (options.dir) {
      models = requireDir(pathToModels, options);
    } else {
      models = require(pathToModels);
    }

    if (models instanceof Array) {
      result = __processArray(models, options);
    } else if (models.constructor.name === 'Object') {
      result = __processKeys(models, options);
    } else {
      result = __processSingle(models, options);
    }

    if (options.objectDef) {
      if (!(result instanceof Array)) result = [result];
      result = result.reduce( (res, s) => {
        let key = s.id && s.id.substr(1) || options.id(s.title);
        res[key] = s;
        return res;
      }, {});
    } else if (result instanceof Array && result.length === 1) {
      result = result[0];
    }

    if (options.json) {
      result = JSON.stringify(result, null, '  ');
      if (processModels.consoleOutput) console.log(result);
    } else {
      if (processModels.consoleOutput) console.dir(result, {depth: null});
    }

    return result;
  // } catch (e) {
  //   console.error('ERROR'.red +': %s', e.message);
  // }
}
processModels.consoleOutput = true;


function __getMongoose(model) {

  let mongoose = model && model.base;

  if (mongoose && mongoose.constructor.name !== 'Mongoose') {
    throw new Error(ERRORS.wrongImport);
  };

  return mongoose;

}

function __processSingle(model, options) {
  const mongoose = __getMongoose(model);
  jsonSchemaExtention(mongoose);
  return options.noid ? model.jsonSchema() : __add_id(model.jsonSchema(), options.id);
};

function __processArray(models, options) {

  if (!models.length) return [];

  const mongoose = __getMongoose(
    models.find(m => m.base && m.base.constructor.name === 'Mongoose')
  );
  jsonSchemaExtention(mongoose);

  return models.reduce((r, m) => {
    if (!m.jsonSchema) return r;
    r.push(
      options.noid ? m.jsonSchema() : __add_id(m.jsonSchema(), options.id)
    );
    return r;
  }, []);
};

function __processKeys(models, options) {

  let names = Object.keys(models);

  if (!names.length) return [];

  let name = names.find(
    n => models[n].base && models[n].base.constructor.name === 'Mongoose'
  );

  if (!name) throw new Error(ERROR.wrongImport);

  const mongoose = __getMongoose(models[name]);
  jsonSchemaExtention(mongoose);

  let mapper = !options.noid ?
    m => __add_id(models[m].jsonSchema(), options.id)
    : m => models[m].jsonSchema();

  return names.reduce( (r, m) => {
    if (models[m].jsonSchema) r.push(mapper(m));
    return r;
  }, []);
}


function __id_mapper(id) {
  switch(id) {
    case 'camel': return helpers.camel;
    case 'underline': return helpers.formatId.bind(null, '_');
    case 'dash': return helpers.formatId.bind(null, '-');
    case 'lower': return (s => s.toLowerCase());
  };
  return (s => s);
}

function __add_id(s, id) {
  return Object.assign({
    id: s.id || '#' + id(s.title)
  }, s);
}
