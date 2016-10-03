# tap-bail

  Abort [TAP](http://en.wikipedia.org/wiki/Test_Anything_Protocol) test runners
  on the first failing assertion.

  Similar to mocha's `--bail`.

  [![build status](https://secure.travis-ci.org/juliangruber/tap-bail.png)](http://travis-ci.org/juliangruber/tap-bail)

## Installation

```sh
$ npm install -g tap-bail
```

## Example

```sh
# run tests, format TAP with tap-spec, exit on first failing test
npm test | tap-bail | tap-spec
```

```js
const tapBail = require('tap-bail')

const stream = tapBail()
  .on('error', () => {}) // failing test
  .on('end', () => {}) // all tests passed
```

## License

MIT
