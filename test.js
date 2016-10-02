import test from 'ava'
import fn from './index'

const exampleInput1 = `
  ffmpeg version N-81741-g1212e34-tessus Copyright (c) 2000-2016 the FFmpeg developers
  built with Apple LLVM version 8.0.0 (clang-800.0.38)
  configuration: --cc=/usr/bin/clang --prefix=/opt/ffmpeg --as=yasm --extra-version=tessus --enable-avisynth --enable-fontconfig --enable-gpl --enable-libass --enable-libbluray --enable-libfreetype --enable-libgsm --enable-libmodplug --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopus --enable-libschroedinger --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libvidstab --enable-libvo-amrwbenc --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libx264 --enable-libx265 --enable-libxavs --enable-libxvid --enable-libzmq --enable-version3 --disable-ffplay --disable-indev=qtkit --disable-indev=x11grab_xcb
  libavutil      55. 30.100 / 55. 30.100
  libavcodec     57. 58.100 / 57. 58.100
  libavformat    57. 50.100 / 57. 50.100
  libavdevice    57.  0.102 / 57.  0.102
  libavfilter     6. 62.100 /  6. 62.100
  libswscale      4.  1.100 /  4.  1.100
  libswresample   2.  1.100 /  2.  1.100
  libpostproc    54.  0.100 / 54.  0.100
[AVFoundation input device @ 0x7ff1799001c0] AVFoundation video devices:
[AVFoundation input device @ 0x7ff1799001c0] [0] FaceTime HD Camera
[AVFoundation input device @ 0x7ff1799001c0] [1] Capture screen 0
[AVFoundation input device @ 0x7ff1799001c0] AVFoundation audio devices:
[AVFoundation input device @ 0x7ff1799001c0] [0] USB audio CODEC
[AVFoundation input device @ 0x7ff1799001c0] [1] Built-in Microphone
`
test('it should parse an input', (t) => {
  t.deepEqual(fn(null, { ffmpegOutput: exampleInput1 }), JSON.parse(`{"audio":["[0] USB audio CODEC","[1] Built-in Microphone"],"video":["[0] FaceTime HD Camera","[1] Capture screen 0"],"unknown":[]}`))
})

const exampleInput2 = `
  ffmpeg version N-81741-g1212e34-tessus Copyright (c) 2000-2016 the FFmpeg developers
  built with Apple LLVM version 8.0.0 (clang-800.0.38)
  configuration: --cc=/usr/bin/clang --prefix=/opt/ffmpeg --as=yasm --extra-version=tessus --enable-avisynth --enable-fontconfig --enable-gpl --enable-libass --enable-libbluray --enable-libfreetype --enable-libgsm --enable-libmodplug --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopus --enable-libschroedinger --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libvidstab --enable-libvo-amrwbenc --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libx264 --enable-libx265 --enable-libxavs --enable-libxvid --enable-libzmq --enable-version3 --disable-ffplay --disable-indev=qtkit --disable-indev=x11grab_xcb
  libavutil      55. 30.100 / 55. 30.100
  libavcodec     57. 58.100 / 57. 58.100
  libavformat    57. 50.100 / 57. 50.100
  libavdevice    57.  0.102 / 57.  0.102
  libavfilter     6. 62.100 /  6. 62.100
  libswscale      4.  1.100 /  4.  1.100
  libswresample   2.  1.100 /  2.  1.100
  libpostproc    54.  0.100 / 54.  0.100
`
test('it should return empty arrays when nothing is available', (t) => {
  t.deepEqual(fn(null, { ffmpegOutput: exampleInput2 }), JSON.parse(`{"audio":[],"video":[],"unknown":[]}`))
})

const exampleInput3 = `
[AVFoundation input device @ 0x7ff1799001c0] [0] Unknown device
[AVFoundation input device @ 0x7ff1799001c0] AVFoundation video devices:
[AVFoundation input device @ 0x7ff1799001c0] [0] FaceTime HD Camera
[AVFoundation input device @ 0x7ff1799001c0] [1] Capture screen 0
[AVFoundation input device @ 0x7ff1799001c0] AVFoundation audio devices:
[AVFoundation input device @ 0x7ff1799001c0] [0] USB audio CODEC
[AVFoundation input device @ 0x7ff1799001c0] [1] Built-in Microphone
`
test('it should handle devices which are listed before an av association is made ', (t) => {
  t.deepEqual(fn(null, { ffmpegOutput: exampleInput3 }), JSON.parse(`{"audio":["[0] USB audio CODEC","[1] Built-in Microphone"],"video":["[0] FaceTime HD Camera","[1] Capture screen 0"],"unknown":["[0] Unknown device"]}`))
})

const exampleInput4 = `
[AVFoundation input device @ 0x7ff1799001c0] Unknown device
[AVFoundation input device @ 0x7ff1799001c0] AVFoundation video devices:
[AVFoundation input device @ 0x7ff1799001c0] [0] FaceTime HD Camera
[AVFoundation input device @ 0x7ff1799001c0] [1] Capture screen 0
[AVFoundation input device @ 0x7ff1799001c0] AVFoundation audio devices:
[AVFoundation input device @ 0x7ff1799001c0] [0] USB audio CODEC
[AVFoundation input device @ 0x7ff1799001c0] [1] Built-in Microphone
`
test('it handle unkown devices', (t) => {
  t.deepEqual(fn(null, { ffmpegOutput: exampleInput4 }), JSON.parse(`{"audio":["[0] USB audio CODEC","[1] Built-in Microphone"],"video":["[0] FaceTime HD Camera","[1] Capture screen 0"],"unknown":["[AVFoundation input device @ 0x7ff1799001c0] Unknown device"]}`))
})
