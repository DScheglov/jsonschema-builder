'use strict';

const ERRORS = {
  wrongPath: 'Specify path to module that exports instance(s) of Mongoose.Model',
  wrongImport: 'The specified module should export instance(s) of Mongoose.Model.'+
               ' Or specified directory should contain at least one such module.'
};

module.exports = exports = ERRORS;
