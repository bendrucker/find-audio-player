# find-audio-player [![Build Status](https://travis-ci.org/bendrucker/find-audio-player.svg?branch=master)](https://travis-ci.org/bendrucker/find-audio-player) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/find-audio-player.svg)](https://greenkeeper.io/)

> Find the first available audio player


## Install

```
$ npm install --save find-audio-player
```


## Usage

```js
var findAudioPlayer = require('find-audio-player')
var findAudioPlayerSync = require('find-audio-player/sync')

findAudioPlayer(function (err, path) {
  // OS X: path === /usr/bin/afplayer
})

var path = findAudioPlayerSync()
```

## API

#### `findAudioPlayer(callback)` -> `undefined`

##### callback

*Required*  
Type: `function`  
Arguments: `err, path`

A callback to call with the path to the first available audio player or an error if no player was found.

#### `findAudioPlayerSync()` -> `string`

Finds the first available audio player and returns the absolute path. If no player is found, an error is thrown.


## License

MIT © [Ben Drucker](http://bendrucker.me)
