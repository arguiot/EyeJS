/*
**   © Arthur Guiot 2017
**         EyeJS
**       eye.js.org
*/

// Require all modules
const ora = require("ora");
const colors = require("colors");
const express = require("express");
const open = require("openurl");
const fs = require("fs");
const path = require("path");
const notifier = require("node-notifier");
// polyfill
console.group = console.group || console.log
console.groupEnd = console.groupEnd || console.log
// Class EyeJS
class EyeJS {
  browser(name, spinner, file) {
  	return new Promise((resolve, reject) => {
  		if (process.env.ENV == "CI" || process.env.CI == true) {
  			spinner.warn();
  			console.group();
  			console.log(`\nCan't run browser tests on CI.\n`.red)
  			console.groupEnd();
  		} else if (!/v8/.test(process.version)) {
  			spinner.warn();
  			console.group();
  			console.log(`\nCan't run browser tests on NodeJS ${process.version}.\n`.red)
  			console.groupEnd();
  		} else {
  			// use express
  			const app = express();
  			const server = app.listen(3000, function () {
  				open.open("http://localhost:3000");
  			})
  			app.get('/', function (req, res) {
  				fs.readFile(path.isAbsolute(file[0]) ? file[0] : process.cwd() + "/" + file[0], (err, data) => {
  					res.send(data.toString('utf8'));
  				});
  			})
  			let fail = 0;
  			app.get('/post/', function (req, res) {
  				const result = req.query.result;
  				const failed = req.query.failed;
  				if (result == 0) {
  					fail += 1;
  					spinner.fail();
  					// failed += 1;
  					console.group();
  					console.log(`\n${failed} test(s) failed\n`.red)
  					console.groupEnd();
  					// console.log(this.data);
  				}
  				else if (result == 1) {
  					spinner.succeed()
  				}
  				else {
  					spinner.warn()
  				}
  				res.send("sucess")
  				server.close(() => {
  					resolve(fail)
  				});
  			});
  			app.use('/static', express.static(path.dirname(path.dirname(file[0]) + "/../")));
  			app.get('/eyejs/', (req, res) => {
  				fs.readFile(__dirname + "/../dist/client.js", (err, data) => {
  					res.send(data.toString('utf8'));
  				});
  			});
  		}
  	});
  }
  constructor() {
  	console.log();
  	this.data = {
  		"tested": 0,
  		"failed": 0
  	};
  	this.exit = 0;
  	this.time = process.hrtime();
  	process.on("exit", (code) => {
  		this.exit = this.data.failed > 0 ? 1 : code;
  		if (this.exit == 0) {
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
  		else if (this.data == 1) {
  			console.log("\n");
  			console.log(`✖ Oups!, There is problem somewhere! Exited with ${code}`.red);
  			notifier.notify({
  				title: 'EyeJS - Error',
  				message: `✖ Oups!, There is problem somewhere! Exited with ${code}`,
  				icon: path.join(__dirname, '../docs/img/EyeJS-logo.png'),
  			})
  			process.exit(1);
  		}
  		else {
  			console.log("\n");
  			console.log("Passed:".bold, this.data.tested);
  			console.log("Failed:".bold.red, this.data.failed);
  			const end = process.hrtime(this.time);
  			const time = Math.round((end[0] * 1000) + (end[1] / 1000000))
  			console.log("Time".bold, `${time > 1000 ? time / 1000 + "s" : time + "ms"}`);
  			console.group();
  			console.log(`✖ Oups!, There is problem somewhere! Exited with ${code}`.red);
  			notifier.notify({
  				title: 'EyeJS - Error',
  				message: `✖ Oups!, There is problem somewhere! Exited with ${code}`,
  				icon: path.join(__dirname, '../docs/img/EyeJS-logo.png'),
  			})
  			process.exit(100);
  		}
  	});
  }
  describe(name, callback) {
  	const start = process.hrtime();
  	console.log(`→ Testing ${name}`.bold)
  	console.log("\n");
  	console.group();
  	callback();
  	console.groupEnd();
  	const end = process.hrtime(this.time);
  	const time = Math.round((end[0] * 1000) + (end[1] / 1000000))
  	console.log(`\nDone in ${time > 1000 ? time / 1000 + "s" : time + "ms"}\n`.bold)
  }
  node(name, spinner, callbacks) {
  	const $ = $ => {
  		class expect {
  			constructor(val) {
  				this.val = val
  			}
  			Equal(val, not) {
  				if((JSON.stringify(val) == JSON.stringify(this.val) && not != false) || (not == false && JSON.stringify(val) != JSON.stringify(this.val))) {
  					return true;
  				} else {
  					return `${this.val} isn't equal to ${val}`
  				}
  			}
  			hasProperty(name, not) {
  				if((this.val.hasOwnProperty(name) && not != false) || (not == false && !this.val.hasOwnProperty(name))) {
  					return true;
  				} else {
  					return `${this.val} doesn't have '${name}' as property`
  				}
  			}
  			includes(val, not) {
  				if((this.val.includes(val) && not != false) || (not == false && !this.val.includes(val))) {
  					return true;
  				} else {
  					return `${this.val} doesn't includes ${val}`
  				}
  			}
  			is(type, not) {
  				if((typeof this.val == type && not != false) || (not == false && typeof this.val != type)) {
  					return true;
  				} else {
  					return `${this.val} isn't a ${type}`
  				}
  			}
  			isCloseTo(actual, precision=2, not) {
  				if((Math.abs(this.val - actual) < Math.pow(10, -precision) / 2 && not != false) || (not == false && !(Math.abs(this.val - actual) < Math.pow(10, -precision) / 2))) {
  					return true;
  				} else {
  					return `${this.val} isn't close to ${actual}, with a precision of ${precision}`
  				}
  			}
  			isTrueFor(callback, not) {
  				if((callback(this.val) && not != false) || (not == false && !callback(this.val))) {
  					return true;
  				} else {
  					return `${this.val} isn't true for ${callback}`
  				}
  			}
  			length(val, not) {
  				if((this.val.length == val && not != false) || (not == false && this.val.length != val)) {
  					return true;
  				} else {
  					return `${this.val} doesn't have for length ${val}`
  				}
  			}
  			Match(val, not) {
  				if((val.test(this.val) && not != false) || (not == false && !val.test(this.val))) {
  					return true;
  				} else {
  					return `${this.val} doesn't match ${val}`
  				}
  			}
  			toRun(not) {
  				try {
  					this.val()
  				} catch (e) {
  					return not == false ? true : false
  				}
  				return not == false ? false : true
  			}
  			visual(not) {
  				this.val instanceof Element ? this.val.scrollIntoView() : null
  				return not == false ? !window.confirm("EyeJS - Is everything alright?") : window.confirm("EyeJS - Is everything alright?") 
  			}
  		}
  		return new expect($)
  	}
  	let result = !0;
  	let failed = [];
  	let tothrow = [];
  	for (var i = 0; i < callbacks.length; i++) {
  		const temp = callbacks[i]($)
  		if (temp == !1 || typeof temp == 'string') {
  			result = false;
  			tothrow.push(temp)
  			failed.push(i + 1)
  		} else if (temp != !1 && temp != !0) {
  			result = temp
  		}
  	}
  	if (result == !1) {
  		spinner.fail();
  		this.data.failed += 1;
  		console.group();
  		for (i = 0; i < failed.length; i++) {
  			console.log(`\nTest ${failed[i]} failed: ${tothrow[i]}\n`.red)
  		}
  		console.groupEnd();
  	}
  	else if (result == !0) {
  		spinner.succeed()
  	}
  	else {
  		spinner.warn()
  	}
  }
  test(name, type, ...callbacks) {
  	this.data.tested += 1;
  	const spinner = ora(name).start();
  	if(type == "browser") {
  		this.browser(name, spinner, callbacks).then(fail => this.data.failed += fail)
  	} else {
  		this.node(name, spinner, callbacks);
  	}
  }
}
// Browserify / Node.js
if (typeof define === "function" && define.amd) {
  define(() => new EyeJS());
  // CommonJS and Node.js module support.
} else if (typeof exports !== "undefined") {
  // Support Node.js specific `module.exports` (which can be a function)
  if (typeof module !== "undefined" && module.exports) {
    exports = module.exports = new EyeJS();
  }
  // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
  exports.DisplayJS = new EyeJS();
} else if (typeof global !== "undefined") {
  global.DisplayJS = new EyeJS();
}