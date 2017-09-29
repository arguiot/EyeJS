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
