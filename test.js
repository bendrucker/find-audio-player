'use strict'

const test = require('tape')
const proxyquire = require('proxyquire')

test('async', function (t) {
  t.test('success', function (t) {
    t.plan(1)

    const find = proxyquire('./', {
      which: function (command, callback) {
        if (command === 'afplay') return callback(null, '/usr/bin/afplay')
        callback(ENOENT(command))
      }
    })

    find(function (err, path) {
      if (err) return t.end(err)
      t.equal(path, '/usr/bin/afplay')
    })
  })

  t.test('none found', function (t) {
    t.plan(2)

    const find = proxyquire('./', {
      which: function (command, callback) {
        callback(ENOENT(command))
      }
    })

    find(function (err, path) {
      t.ok(err)
      t.equal(err.message, 'No player found')
    })
  })

  t.test('unexpected error', function (t) {
    t.plan(2)

    const find = proxyquire('./', {
      which: function (command, callback) {
        callback(new Error('boom'))
      }
    })

    find(function (err, path) {
      t.ok(err)
      t.equal(err.message, 'boom')
    })
  })

  t.end()
})

test('sync', function (t) {
  t.test('success', function (t) {
    const find = proxyquire('./sync', {
      which: {
        sync: function (command) {
          if (command === 'afplay') return '/usr/bin/afplay'
          throw ENOENT(command)
        }
      }
    })

    t.equal(find(), '/usr/bin/afplay')

    t.end()
  })

  t.test('none found', function (t) {
    const find = proxyquire('./sync', {
      which: {
        sync: function (command) {
          throw ENOENT(command)
        }
      }
    })

    t.throws(find, /No player found/)

    t.end()
  })

  t.test('unexpected error', function (t) {
    const find = proxyquire('./sync', {
      which: {
        sync: function (command) {
          throw new Error('boom')
        }
      }
    })

    t.throws(find, /boom/)

    t.end()
  })

  t.end()
})

function ENOENT (command) {
  const err = new Error('not found: ' + command)
  err.code = 'ENOENT'
  return err
}
