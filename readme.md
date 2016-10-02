# ffmpeg-devices [![Build Status](https://travis-ci.org/ericwooley/ffmpeg-devices.svg?branch=master)](https://travis-ci.org/ericwooley/ffmpeg-devices) [![Coverage Status](https://coveralls.io/repos/github/ericwooley/ffmpeg-devices/badge.svg?branch=master)](https://coveralls.io/github/ericwooley/ffmpeg-devices?branch=master)

> Git a list of avialable audio and video devices from ffmpeg

# WARNING

Currently this only works on mac. If you want this to work on another platform, that is coming eventually, and PR's are welcome!

## Install

```
$ npm install --save ffmpeg-devices
```


## Usage

```js
const ffmpegDevices = require('ffmpeg-devices');

ffmpegDevices();
// => {
// 	audio: [], // audio devices
// 	video: [], // video devices
// 	unknown: [] // unknown devices
// }

// If you want to use a specific bin
ffmpegDevices('<path to ffmpeg binary>')

// can specify an input to parse if you would prefer
ffmpeg(null, {
	ffmpegOutput: `some output to parse` // ffmpeg should not be called in this case.
})
```

## License

MIT © [Eric Wooley](http://github.com/ericwooley)
