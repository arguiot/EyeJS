const ora = require('ora');
const colors = require('colors');

class EyeJS {
	constructor() {
		console.log();
		this.data = {
			"tested": 0,
			"failed": 0
		};
		this.temp = true;
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
				console.log("✖ Oups!, There is problem somewhere!".red);
				process.exit(1);
			}
		});
	
		this.case = $ => {
			class expect {
				constructor(val) {
					this.val = val
				}
				equal(val) {
					return val === this.val ? true : false
				}
			}
			return new expect($)
		}
	}
	node(name, spinner, callbacks) {
		const $ = this.case;
		let result = !0;
		for (let i in callbacks) {
			const temp = i($)
			if (temp == !1) {
				result = result == !0 || result == !1 ? false : result
			} else if (temp != !1 && temp != !0) {
				result = temp
			}
		}
		if (result == !1) {
			spinner.fail();
			this.data.failed += 1;
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
	updateTemp(val) {
		this.temp = val;
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