'use strict'

const which = require('which').sync
const players = require('./players.json')

module.exports = findAudioPlayerSync

function findAudioPlayerSync () {
  var paths = players.map(function (player) {
    try {
      return which(player)
    } catch (err) {
      if (err.code === 'ENOENT') return
      throw err
    }
  })

  paths = paths.filter(Boolean)

  if (!paths.length) throw new Error('No player found')

  return paths[0]
}
