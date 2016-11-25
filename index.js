#!/usr/bin/env node
'use strict';

const program = require('commander');
const pckg = require('./package.json');
const processModels = require('./lib');

program
  .version(pckg.version)
  .usage('[options] <pathToModels>')
  .option('-j, --json', 'JSON format for output')
  .option('-n, --noid', 'Removes id field from resulting schema')
  .parse(process.argv);

processModels(program.args[0], {
  json: !!program.json,
  addId: !program.noid
});
