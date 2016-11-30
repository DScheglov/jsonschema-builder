'use strict';

const fs = require('fs');
const path = require('path');

function formatId(sep, str) {
  sep = sep || '-';
  return (str || '').toString()
    .replace(/^([A-Z]+)/, m => m.toLowerCase())
    .replace(/([A-Z]+)/g, m => sep + m.toLowerCase())
    .replace(new RegExp('[^a-z0-9'+sep+']', 'gi'), sep);
}

function camel(str) {
  return (str || '').toString()
    .replace(/^[A-Z]+/, m => m.toLowerCase())
    .replace(/([._-][a-z])/g, m => m.substr(1).toUpperCase());
}

function requireDir(pathToModels, options) {

  let files = fs.readdirSync(pathToModels);

  return files.reduce( (res, f) => {
    let fN = path.join(pathToModels, f);
    let fStat = fs.lstatSync(fN);

    if (fStat.isDirectory()) {
      if (!options.recursive) return res;
      return Object.assign(res, requireDir(fN, options));
    }

    if (!fStat.isFile()) return res;

    let mod = require(fN);

    if (mod.base && mod.base.constructor.name === 'Mongoose') {
      res[mod.modelName] = mod;
    }

    else if (mod instanceof Array) {
      mod.reduce( (res, m) => {
        if (m.base && m.base.constructor.name === 'Mongoose') {
          res[m.modelName] = m;
        }
        return res;
      }, res);
    }

    else if (mod.constructor.name === 'Object') {
      res = Object.assign(res, mod)
    }

    return res;
  }, {})
}

function fileName(fN) {
  return (fN || '').toString().split('.').slice(0, -1).join('.');
}

module.exports = exports = {
  formatId: formatId,
  camel: camel,
  requireDir: requireDir
}
