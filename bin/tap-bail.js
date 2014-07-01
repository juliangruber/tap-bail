#!/usr/bin/env node

var parser = require('tap-parser');

var p = parser(function(results){
  process.exit(Number(!results.ok));
});

p.on('assert', function(assert){
  if (!assert.ok) {
    // Only abort after, error message was printed
    p.on('extra', function(extra) {
        if(extra.indexOf('...') !== -1) {
            process.exit(1);
        }
    });
  }
});

process.stdin.pipe(process.stdout);
process.stdin.pipe(p);

