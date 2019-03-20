# logtimer [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> check the interval time in the log

## Installation

```sh
$ npm install -g logtimer
```

## Usage

```sh
$ adb logcat | logtimer -m chrome
$ adb logcat | logtimer -d > test.json
$ adb logcat | logtimer -f test.json
```

## License

MIT © [Bob Hwang](https://agvim.wordpress.com/)


[npm-image]: https://badge.fury.io/js/logtimer.svg
[npm-url]: https://npmjs.org/package/logtimer
[travis-image]: https://travis-ci.org/afrontend/logtimer.svg?branch=master
[travis-url]: https://travis-ci.org/afrontend/logtimer
[daviddm-image]: https://david-dm.org/afrontend/logtimer.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/afrontend/logtimer
[coveralls-image]: https://coveralls.io/repos/afrontend/logtimer/badge.svg
[coveralls-url]: https://coveralls.io/r/afrontend/logtimer
