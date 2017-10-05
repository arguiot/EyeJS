#!/usr/bin/env node
'use strict';
const options = process.argv;

if (process.argv.includes("-h")) {
	console.log("EyeJS:\n $ eye [optional: file]");
	process.exit(0);
}
const fs = require("fs");
const glob = require('glob');
const eye = require('../dist/eye.js');
function run(file) {
	fs.readFile(process.cwd() + "/" + file, (err, data) => {
		if (err != null) {
			console.log(`Problem with 'fs':\n ${err}`);
			process.exit(1)
		} else {
			console.log("\nPass".bold.inverse + ` ${file}`.bold)
			console.log("\n");
			eval(data.toString('utf8'));
		}
	})
}
if (process.argv.length > 1 && /node/.test(process.argv[0]) != true) {
	run(process.argv[1])
} else if (process.argv.length > 2 && /node/.test(process.argv[0]) == true) {
	run(process.argv[2])
} else {
	glob(process.cwd() + "/" + "**/*test.js", options, function (err, files) {
		if (err != null) {
			console.log(`Problem with 'glob':\n ${err}`);
			process.exit(1)
		} else {
			for (let i of files) {
				run(i)
			}
		}
	})
}
