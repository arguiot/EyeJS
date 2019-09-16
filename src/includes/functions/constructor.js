constructor() {
	console.log();
	this.data = {
		"tested": 0,
		"failed": 0
	};
	this.CI = false
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
