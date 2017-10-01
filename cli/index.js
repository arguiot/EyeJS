#!/usr/bin/env node
'use strict';
const options = process.argv;

if (process.argv.includes("-h")) {
	console.log("EyeJS:\n $ eye [optional: file]");
	process.exit(0);
}

const eye = require('eye.js');
const fs = require("fs");
const glob = require('glob');
function run(file) {
	fs.readFile(file, (err, data) => {
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
} else {
	glob("**/*test.js", options, function (err, files) {
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
