#!/usr/bin/env node
'use strict';
const options = process.argv;
const { execFile } = require('child_process');
const child = execFile('node', ['../dist/test.js'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
