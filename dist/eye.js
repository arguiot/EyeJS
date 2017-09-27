const ora = require('ora');
const colors = require('colors');

class EyeJS {
	get case() {
		class expect {
			constructor(val) {
				this.val = val;
			}
			toBe(val) {
				return val === this.val ? true : false;
			}
		}
		return new expect;
	}
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
	}
	node(name, callback, spinner) {
		this.temp = true;
		const $ = this.case;
		const result = callback($);
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
	test(name, type="node", callback) {
		this.data.tested += 1;
		const spinner = ora(name).start();
		return type == "browser" ? this.browser(name, callback, spinner) : this.node(name, callback, spinner);
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