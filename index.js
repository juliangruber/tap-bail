const parser = require('tap_parser')
const duplex = require('duplexer')
const {obj: through} = require('throo')

const exitOnFail = () => {
  const parserStream = parser()
  const exitStream = parserStream.pipe(through((push, chunk, enc, cb) => {
    const value = chunk.value + '\n'
    push(value)
    if (chunk.type === 'test' && !chunk.parsed.ok) {
      cb(value) // error
    } else {
      cb()
    }
  }))
  return duplex(parserStream, exitStream)
}

module.exports = exitOnFail
