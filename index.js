'use strict'
var shell = require('shelljs')
var endOfLine = require('os').EOL

var deviceModeEnum = {
  unkown: 0,
  video: 1,
  audio: 2
}
/**
 * Get a list of usuable recording devices
 * @param ffmpeg                      Command to run ffmpeg
 * @param opts                        Options
 * @param opts.ffmpegOutput: string   Use this output instead of output from ffmpeg
 * @return collection                 Collection of available devices
 * @return collection.audio           ffmpeg listed Audio devices
 * @return collection.video           ffmpeg listed Video devices
 * @return collection.unkown          ffmpeg listed unkown devices
 */
function getFFMPEGDevices (ffmpeg, opts) {
  ffmpeg = ffmpeg || 'ffmpeg'
  opts = opts || {}
  var output = opts.ffmpegOutput || shell.exec(ffmpeg + ' -f avfoundation -list_devices true -i ""', {silent: true})
  output = opts.ffmpegOutput || output.stdout || output.stderr
  output = output.trim()
  output = output.split(endOfLine)
    // example line: [AVFoundation input device @ 0x7ff1799001c0] [1] Built-in Microphone
    .filter(function (line) { return line.match(/AVFoundation/) })
  var deviceTypeMode = deviceModeEnum.unkown // 0 for unknown, 1 for video, 2 for audio
  var deviceLists = output.reduce(function (collection, line) {
    if (line.match(/AVFoundation video devices/)) {
      deviceTypeMode = deviceModeEnum.video
    } else if (line.match(/AVFoundation audio devices/)) {
      deviceTypeMode = deviceModeEnum.audio
    } else {
      var extractedText = extractTextFromLine(line)
      switch (deviceTypeMode) {
        case deviceModeEnum.video:
          collection.video.push(extractedText)
          break
        case deviceModeEnum.audio:
          collection.audio.push(extractedText)
          break
        default:
          collection.unknown.push(extractedText)
      }
    }
    return collection
  }, { audio: [], video: [], unknown: [] })
  // .map(function (line) {return line.match(/(\[\d*\].*)/)[1]})
  return deviceLists
};
module.exports = getFFMPEGDevices
function extractTextFromLine (line) {
  var extractedText
  try {
    extractedText = line.match(/(\[\d*\].*)/)[1]
  } catch (e) {
    extractedText = line
  }
  return extractedText
}
