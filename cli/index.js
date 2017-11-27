#!/usr/bin/env node

"use strict";
const options = process.argv;
const fs = require("fs");

if (process.argv.includes("-h")) {
  console.log("EyeJS:\n $ eye [optional: file]");
  process.exit(0);
} else if (process.argv.includes("-v")) {
  const pjson = require("../package.json");
  console.log(`EyeJS ${pjson.version}`);
} else {
  const globby = require("globby");
  const eye = require("../dist/eye.js");
  const path = require("path");

  let __testDir = "";
  function rmFromArray(array, condition) {
    const obj = [];
    for (const i in array) {
      if (condition(i) == !1) {
        obj.push(array[i]);
      }
    }
    return obj;
  }
  function run(file) {
    __testDir = path.dirname(process.cwd() + "/" + file) + "/";
    fs.readFile(process.cwd() + "/" + file, (err, data) => {
      if (err != null) {
        console.log(`Problem with 'fs':\n ${err}`);
        process.exit(1);
      } else {
        console.log("\nPass".bold.inverse + ` ${file}`.bold);
        console.log("\n");
        eval(data.toString("utf8"));
      }
    });
  }
  if (process.argv.length > 1 && /node/.test(process.argv[0]) != true) {
    run(process.argv[1]);
  } else if (process.argv.length > 2 && /node/.test(process.argv[0]) == true) {
    run(process.argv[2]);
  } else {
    globby(["**/__test*__/*.js", "!node_modules/**"]).then(files => {
      for (let i of files) {
        try {
          run(i);
        } catch (e) {
          console.log(`Can't run ${i}: ${e}`.red);
        }
      }
    });
  }
}
