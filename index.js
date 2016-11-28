#!/usr/bin/env node
'use strict';

const processModels = require('./lib');

if (module.parent) {
  processModels.consoleOutput = false;
  module.exports = exports = processModels;
} else {
  const program = require('commander');
  const pckg = require('./package.json');
  program
    .version(pckg.version)
    .usage('[options] <pathToModels>')
    .option('-d, --dir', 'Process <pathToModels> as a directory')
    .option('-r, --recursive', 'Process directory recursively')
    .option('-j, --json', 'JSON format for output')
    .option('-n, --noid', 'Removes id field from resulting schema')
    .option('-o, --object-def', 'Output as json-schema definitions object')
    .option('-i, --id [style]', 'Style for json-schema identifiers', /^(camel|underline|dash|lower)$/i)
    .option('--no-color', 'Prevents colorized output')
    .arguments('style', 'camel')
    .parse(process.argv);

  processModels(program.args[0], {
    json: !!program.json,
    noid: !!program.noid,
    dir: !!program.dir,
    objectDef: !!program.objectDef,
    id: typeof(program.id) === 'string' ? program.id : 'dash'
  });
}
