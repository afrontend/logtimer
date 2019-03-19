const assert = require("assert");
const logtimer = require("../index.js");

const preTime = "11-11 11:11:11.011";
const curTime = "11-11 11:11:11.111";

console.log(logtimer.androidTimeDiff(preTime, curTime));

describe("logtimer", () => {
  it("androidTimeStr with valid argument", () => {
    assert(logtimer.androidTimeStr(preTime) !== "");
  });
  it("androidTimeStr with invalid argument", () => {
    assert(logtimer.androidTimeStr("12 12 11:11:11.111") === "");
  });
  it("androidTimeDiff", () => {
    assert(logtimer.androidTimeDiff(preTime, curTime) === 100);
  });
});
