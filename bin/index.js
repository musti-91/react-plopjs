#!/usr/bin/env node
// require('plop/bin/plop')
const path = require('path')
const args = process.argv.slice(2)
const argv = require('minimist')(args)
const { Plop, run } = require('plop')

Plop.launch(
  {
    cwd: argv.cwd,
    configPath: path.join(__dirname, '../plopfile.js'),
    require: argv.require,
    completion: argv.completion,
  },
  (env) => run({ ...env, dest: process.cwd() }, undefined, true)
)
