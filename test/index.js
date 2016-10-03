const test = require('tape')
const {spawn} = require('child_process')
const {join: joinPath} = require('path')
const bail = require('../')
const spawnBail = () => spawn(joinPath(__dirname, '../bin/cmd.js'))

test('cmd exits with exitCode 1 on failing test', t => {
  t.plan(1)
  const p = spawnBail()
  p.on('close', exitCode => {
    t.equal(exitCode, 1)
  })
  p.stdin.write('1..2\n')
  p.stdin.write('not ok 1\n')
  p.stdin.write('ok 2\n')
})

test('cmd TAP passes through until failing test', t => {
  t.plan(2)
  const datas = [
    '1..2\n',
    'ok 1\n',
    'not ok 2 abc\n',
    'ok 3 do not want\n'
  ]
  const p = spawnBail()
  let allData = ''
  p.stdout.on('data', data => { allData += data })
  datas.forEach(data => p.stdin.write(data))
  setTimeout(() => {
    const lines = allData.split('\n')
      .filter(v => v.length)
      .map(v => v + '\n')
    if (lines.length === 4) {
      t.fail('TAP line came through after failing test')
    }
    if (lines[lines.length - 1] === datas[2]) {
      t.pass('Failing test is the last line')
    }
    t.deepEqual(datas.slice(0, 3), lines, 'incoming lines and outgoing lines match up')
  }, 500)
})

test(`cmd doesn't output failing test error message from stream`, t => {
  t.plan(1)
  const p = spawnBail()
  let allErr = ''
  p.stderr.on('data', data => allErr += data)
  p.on('close', () => t.equal(allErr, '', 'stream error was caught'))
  p.stdin.write('not ok\n')
  p.stdin.write('# whatever\n')
})

test('programmatic stream', t => {
  t.plan(1)
  const stream = bail()
    .on('error', err => t.pass('stream threw err: ' + err))
    .on('end', () => t.fail('stream exited normally'))
  stream.write('not ok\n')
  stream.end()
})
