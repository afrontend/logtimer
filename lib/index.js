#!/usr/bin/env node
const cli = require("cli");
const moment = require("moment");

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

function parse(cli, config, timeStr, timeDiff) {
  let lineNumber = 0;
  let curTime;
  let prevTime;
  let startTime;

  if (!config) {
    console.log("Use default config");
    config = [
      {
        pattern: "chrome",
        description: "chrome"
      }
    ];
  }

  console.log(config);

  cli.withInput(function(line, newline, eof) {
    lineNumber++;
    if (!eof) {
      let i = 0;
      for (i = 0; i < config.length; i++) {
        let pattern = config[i].pattern;
        let description = config[i].description;
        const re = new RegExp(pattern);
        if (line.match(re)) {
          curTime = timeStr(line);
          if (prevTime === undefined) {
            prevTime = curTime;
            startTime = curTime;
          }
          console.log(
            timeDiff(startTime, curTime) + "ms",
            "(+" + timeDiff(prevTime, curTime) + "ms)",
            description,
            "#",
            lineNumber
          );
          prevTime = curTime;
        }
      }
    }
  });
}

function start(config) {
  parse(cli, config, androidTimeStr, androidTimeDiff);
}

module.exports = {
  start,
  androidTimeStr,
  androidTimeDiff
};
