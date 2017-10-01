/*
**   © Arthur Guiot 2017
**         EyeJS
**       eye.js.org
*/


// Require all modules
const ora = require('ora');
const colors = require('colors');
const http = require('http');
const open = require('openurl');
const fs = require('fs');

// Class EyeJS
class EyeJS {
	browser(name, spinner, file) {
		//create a server object:
		http.createServer((req, res) => {
			const chunks = [];
			request.on('data', chunk => chunks.push(chunk));
			request.on('end', () => {
				const data = JSON.parse(Buffer.concat(chunks));
				const result = data.status;
				const failed = data.failed;
				if (result == !1) {
					spinner.fail();
					this.data.failed += 1;
					console.log(`\nTest ${failed} failed\n`)
				}
				else if (result == !0) {
					spinner.succeed()
				}
				else {
					spinner.warn()
				}
			});
			fs.readFile(file, (err, data) => {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data)
				res.end()
			});
		}).listen(8080); //the server object listens on port 8080
		open.open("http://localhost:8080")
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
				console.log("Time".bold, `${Math.round((end[0] * 1000) + (end[1] / 1000000))}ms`);
				console.group();
				console.log("✔ EyeJS exited with no critical errors".green);
				process.exit(0);
			}
			else {
				console.log("\n");
				console.log(`✖ Oups!, There is problem somewhere! Exited with ${code}`.red);
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
				Match(val) {
					return val.test(this.val) == true ? true : false
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
			console.log(`\nTest ${failed} failed\n`)
		}
		else if (result == !0) {
			spinner.succeed()
		}
		else {
			spinner.warn()
		}
	}
	test(name, type="node") {
		this.data.tested += 1;
		const spinner = ora(name).start();
		let callbacks = [];
		for (var i = 0; i < arguments.length - 2; i++) {
			callbacks.push(arguments[i + 2])
		}
		return type == "browser" ? this.browser(name, spinner, callbacks) : this.node(name, spinner, callbacks);
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