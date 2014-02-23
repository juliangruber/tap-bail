
# tap-bail

  Abort [TAP](http://en.wikipedia.org/wiki/Test_Anything_Protocol) test runners
  on the first failing assertion.

  Similar to mocha's `--bail`.

## Example

  With tap-bail:

```bash
$ make test | tap-bail
TAP version 13
# test.js
# TAP version 13
# success
not ok 1 (unnamed assert)
  ---
    file:   /Users/julian/pro/tap-bail/test.js
    line:   5
    column: 5
    stack:
      - getCaller (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-assert.js:418:17)
      - Function.assert (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-assert.js:21:16)
      - Test._testAssert [as ok] (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-test.js:87:16)
      - Test.src (/Users/julian/pro/tap-bail/test.js:5:5)
      - Test.EventEmitter.emit (events.js:117:20)
      - Test.emit (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-test.js:104:8)
      - GlobalHarness.Harness.process (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-harness.js:87:13)
      - process._tickCallback (node.js:415:13)
      - Function.Module.runMain (module.js:499:11)
      - startup (node.js:119:16)
  ...
```

  Without tap-bail:

```bash
$ make test
TAP version 13
# test.js
# TAP version 13
# success
not ok 1 (unnamed assert)
  ---
    file:   /Users/julian/pro/tap-bail/test.js
    line:   5
    column: 5
    stack:
      - getCaller (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-assert.js:418:17)
      - Function.assert (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-assert.js:21:16)
      - Test._testAssert [as ok] (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-test.js:87:16)
      - Test.src (/Users/julian/pro/tap-bail/test.js:5:5)
      - Test.EventEmitter.emit (events.js:117:20)
      - Test.emit (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-test.js:104:8)
      - GlobalHarness.Harness.process (/Users/julian/pro/tap-bail/node_modules/tap/lib/tap-harness.js:87:13)
      - process._tickCallback (node.js:415:13)
      - Function.Module.runMain (module.js:499:11)
      - startup (node.js:119:16)
  ...
ok 2 should be equal
ok 3 should be equal
# fail
ok 4 should be equal
ok 5 (unnamed assert)
# tests 5
# pass  4
# fail  1
ok 6 ./test.js


1..6
# tests 6
# pass  5
# fail  1
make: *** [test] Error 1
```

## Compatibility

  Since all tap-bail needs is TAP output it works with any language and any
  TAP producing library.

  When using the node `tap` module, be sure to pass `--tap` in order not to
  get the abbreviated output:

```bash
$ tap --tap test.js | tap-bail
```

## Installation

```bash
$ npm install -g tap-bail
```

## License

  MIT
 
