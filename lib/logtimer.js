#!/usr/bin/env node
const fs = require("fs");
const logtimer = require("./index");
const program = require("commander");
const pkg = require("../package.json");
const cosmiconfig = require("cosmiconfig");
const explorer = cosmiconfig(pkg.name.split("/")[1]);

program
  .version(pkg.version)
  .option("-d, --defaults", "print a default json file")
  .option("-f, --file [value]", "use a config json file")
  .option("-m, --message [value]", "use a string as a target message")
  .parse(process.argv);

const defaultConfig = [
  {
    pattern: "chrome",
    description: "chrome"
  }
];

const getConfig = path => {
  let config = null;
  if (fs.existsSync(path)) {
    try {
      config = JSON.parse(fs.readFileSync(path, "utf8"));
    } catch (e) {
      console.log(e.message);
    }
  }
  return config;
};

const makeConfig = message => {
  defaultConfig[0].pattern = message;
  defaultConfig[0].description = message;
  return defaultConfig;
};

const activate = program => {
  if (program.defaults) {
    console.log(JSON.stringify(defaultConfig, null, 2));
  } else if (program.file) {
    logtimer.start(getConfig(program.file));
  } else if (program.message) {
    logtimer.start(makeConfig(program.message));
  } else {
    explorer.search()
      .then(result => {
        if(result.isEmpty) {
          console.log("Use default config");
          logtimer.start(defaultConfig);
        } else {
          console.log("Use", result.filepath);
          logtimer.start(result.config);
        }
      })
      .catch(error => {
        console.log("Use default config");
        logtimer.start(defaultConfig);
      });
  }
};

activate(program);
