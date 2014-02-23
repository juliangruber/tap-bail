var spawn = require('child_process').spawn;
var test = require('tap').test;

test('success', function(t){
  t.ok(0)
  var src = 'require("tap").test(function(t){t.ok(1);t.end()});';
  src += src;
  var runner = spawn('node', ['-e', src]);
  var bail = spawn('./bin/tap-bail.js');

  runner.stderr.pipe(process.stderr);
  bail.stderr.pipe(process.stderr);

  var runnerOut = '';
  runner.stdout.on('data', function(chunk){
    runnerOut += chunk.toString();
  });

  var bailOut = '';
  bail.stdout.on('data', function(chunk){
    bailOut += chunk.toString();
  });

  runner.stdout.pipe(bail.stdin);
  bail.on('exit', function(code){
    t.equal(code, 0);
    t.equal(runnerOut, bailOut);
    t.end();
  });
});

test('fail', function(t){
  var src = 'require("tap").test("NAME", function(t){t.ok(0);t.end()});';
  src += src;
  var runner = spawn('node', ['-e', src]);
  var bail = spawn('./bin/tap-bail.js');

  runner.stderr.pipe(process.stderr);
  bail.stderr.pipe(process.stderr);

  var runnerOut = '';
  runner.stdout.on('data', function(chunk){
    runnerOut += chunk.toString();
  });

  var bailOut = '';
  bail.stdout.on('data', function(chunk){
    bailOut += chunk.toString();
  });

  runner.stdout.pipe(bail.stdin);
  bail.on('exit', function(code){
    t.equal(code, 1);
    t.ok(runnerOut.length > bailOut.length);
    t.end();
  });
});

