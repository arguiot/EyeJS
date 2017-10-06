/*
**   © Arthur Guiot 2017
**         EyeJS
**       eye.js.org
*/


// Require all modules
const ora = require('ora');
const colors = require('colors');
const express = require('express');
const open = require('openurl');
const fs = require('fs');
const path = require('path');
const notifier = require('node-notifier');

// Class EyeJS
class EyeJS {
	browser(name, spinner, file) {
		// use express
		const app = express();
		app.get('/', function (req, res) {
			fs.readFile(path.isAbsolute(file[0]) ? file[0] : process.cwd() + "/" + file[0], (err, data) => {
				res.send(data.toString('utf8'));
			});
		})
		const server = app.listen(3000, function () {
			open.open("http://localhost:3000");
		})
		app.get('/post/', function (req, res) {
			const result = req.query.result;
			const failed = req.query.failed;
			if (result == 0) {
				spinner.fail();
				// failed += 1;
				console.log(`\nTest ${failed} failed\n`)
				// console.log(this.data);
			}
			else if (result == 1) {
				spinner.succeed()
			}
			else {
				spinner.warn()
			}
			res.send("sucess")
			server.close();
		});
		app.get('/js/', (req, res) => {
			fs.readFile(__dirname + "/../dist/client.js", (err, data) => {
				res.send(data.toString('utf8'));
			});
		});
	}
	constructor() {
		console.log();
		this.data = {
			"tested": 0,
			"failed": 0
		};
		this.time = process.hrtime();
		process.on("exit", (code) => {
			if (code == 0) {
				console.log("\n");
				console.log("Passed:".bold, this.data.tested);
				console.log("Failed:".bold.red, this.data.failed);
				const end = process.hrtime(this.time);
				const time = Math.round((end[0] * 1000) + (end[1] / 1000000))
				console.log("Time".bold, `${time > 1000 ? time / 1000 + "s" : time + "ms"}`);
				console.group();
				console.log("✔ EyeJS exited with no critical errors".green);
				notifier.notify({
					title: 'EyeJS',
					message: '✔ EyeJS exited with no critical errors',
					icon: path.join(__dirname, '../docs/img/EyeJS-logo.png'),
				})
				process.exit(0);
			}
			else {
				console.log("\n");
				console.log(`✖ Oups!, There is problem somewhere! Exited with ${code}`.red);
				notifier.notify({
					title: 'EyeJS - Error',
					message: `✖ Oups!, There is problem somewhere! Exited with ${code}`,
					icon: path.join(__dirname, '../docs/img/EyeJS-logo.png'),
				})
				process.exit(1);
			}
		});
	}
	node(name, spinner, callbacks) {
		const $ = $ => {
			class expect {
				constructor(val) {
					this.val = val
				}
				Equal(val) {
					return JSON.stringify(val) == JSON.stringify(this.val) ? true : false
				}
				is(type) {
					return typeof this.val == type ? true : false;
				}
				isCloseTo(actual, precision=2) {
					return Math.abs(this.val - actual) < Math.pow(10, -precision) / 2;
				}
				isTrueFor(callback) {
					return callback(this.val);
				}
				Match(val) {
					return val.test(this.val) == true ? true : false
				}
				toRun() {
					try {
						this.val()
					} catch (e) {
						return false
					}
					return true
				}
			}
			return new expect($)
		}
		let result = !0;
		let failed = [];
		for (var i = 0; i < callbacks.length; i++) {
			const temp = callbacks[i]($)
			if (temp == !1) {
				result = result == !0 || result == !1 ? false : result
				failed.push(i + 1)
			} else if (temp != !1 && temp != !0) {
				result = temp
			}
		}
		if (result == !1) {
			spinner.fail();
			this.data.failed += 1;
			console.group();
			console.log(`\nTest ${failed} failed\n`.red)
			console.groupEnd();
		}
		else if (result == !0) {
			spinner.succeed()
		}
		else {
			spinner.warn()
		}
	}
	test(name, type) {
		this.data.tested += 1;
		const spinner = ora(name).start();
		let callbacks = [];
		for (var i = 0; i < arguments.length - 2; i++) {
			callbacks.push(arguments[i + 2])
		}
		type == "browser" ? this.browser(name, spinner, callbacks) : this.node(name, spinner, callbacks);
	}
}
// Browserify / Node.js
if (typeof define === "function" && define.amd) {
	define(() => new EyeJS);
// CommonJS and Node.js module support.
} else if (typeof exports !== "undefined") {
		// Support Node.js specific `module.exports` (which can be a function)
	if (typeof module !== "undefined" && module.exports) {
		exports = module.exports = new EyeJS;
	}
		// But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
	exports.DisplayJS = new EyeJS;
} else if (typeof global !== "undefined") {
	global.DisplayJS = new EyeJS;
}