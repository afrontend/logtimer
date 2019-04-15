#!/usr/bin/env node
const _ = require("lodash");
const moment = require("moment");
const readline = require("readline");

function androidTimeStr(str) {
  const timeRe = /^\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d/;
  const resultStr = timeRe.exec(str);
  return resultStr === null ? "" : resultStr[0];
}

function androidTimeDiff(prevTime, curTime) {
  const tempPrevTime = moment(prevTime, "MM-DD HH:mm:ss.SSS");
  const tempCurTime = moment(curTime, "MM-DD HH:mm:ss.SSS");
  return tempCurTime.valueOf() - tempPrevTime.valueOf();
}

function getMessage(startTime, prevTime, curTime, timeDiff) {
  return (
    timeDiff(startTime, curTime) +
    "ms " +
    "(+" +
    timeDiff(prevTime, curTime) +
    "ms)"
  );
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
      const pattern = message.pattern;
      const description = message.description || line;
      const re = new RegExp(pattern);
      if (line.match(re)) {
        curTime = timeStr(line);
        if (prevTime === undefined) {
          prevTime = curTime;
          startTime = curTime;
        }
        console.log(
          getMessage(startTime, prevTime, curTime, timeDiff),
          description,
          "#",
          lineNumber
        );
        prevTime = curTime;
      }
    });
  });
}

function start(config) {
  parse(config, androidTimeStr, androidTimeDiff);
}

module.exports = {
  start,
  androidTimeStr,
  androidTimeDiff
};
