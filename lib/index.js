#!/usr/bin/env node
const _ = require("lodash");
const moment = require("moment");
const readline = require("readline");

const timeStyle = {
  android: /^\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d/
};

const getTimeRe = style => timeStyle[style];

const timeStrFn = style => str => {
  const timeRe = getTimeRe(style);
  if (!timeRe) return "";
  const resultStr = timeRe.exec(str);
  return resultStr === null ? "" : resultStr[0];
};

const timeFormat = {
  android: "MM-DD HH:mm:ss.SSS"
};

const getTimeFormat = style => timeFormat[style];

const timeDiffFn = style => (prevTime, curTime) => {
  const tPrevTime = moment(prevTime, getTimeFormat(style));
  const tCurTime = moment(curTime, getTimeFormat(style));
  return tCurTime.valueOf() - tPrevTime.valueOf();
};

function getMessage(startTime, prevTime, curTime, timeDiff) {
  return (
    timeDiff(startTime, curTime) +
    "ms " +
    "(+" +
    timeDiff(prevTime, curTime) +
    "ms)"
  );
}

function isMatch(line, patternString) {
  return line.match(new RegExp(patternString));
}

function parse(config, timeStr, timeDiff) {
  let lineNumber = 0;
  let curTime;
  let prevTime;
  let startTime;

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on("line", function(line) {
    lineNumber++;
    _.each(config, message => {
      const description = message.description || line;
      if (isMatch(line, message.pattern)) {
        curTime = timeStr(line);
        if (prevTime === undefined) {
          prevTime = curTime;
          startTime = curTime;
        }
        console.log(
          "#",
          lineNumber,
          getMessage(startTime, prevTime, curTime, timeDiff),
          description
        );
        prevTime = curTime;
      }
    });
  });
}

function start(config) {
  parse(config, timeStrFn("android"), timeDiffFn("android"));
}

module.exports = {
  start,
  androidTimeStr: timeStrFn("android"),
  androidTimeDiff: timeDiffFn("android")
};
