#!/usr/bin/env node

const tapBail = require('../')

process.stdin
  .pipe(tapBail())
  .on('error', err => process.exit(1))
  .pipe(process.stdout)
