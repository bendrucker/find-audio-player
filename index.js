'use strict'

const which = require('which')
const parallel = require('run-parallel')
const players = require('./players.json')

module.exports = findAudioPlayer

function findAudioPlayer (callback) {
  parallel(players.map(Find), function (err, results) {
    if (err) return callback(err)

    results = results.filter(Boolean)

    if (!results.length) {
      return callback(new Error('No player found'))
    }

    callback(null, results[0])
  })
}

function Find (player) {
  return function find (callback) {
    which(player, function (err, path) {
      if (err && err.code === 'ENOENT') {
        return callback(null)
      }

      if (err) return callback(err)

      callback(null, path)
    })
  }
}
