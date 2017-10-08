async test(name, type) {
	this.data.tested += 1;
	const spinner = ora(name).start();
	let callbacks = [];
	for (var i = 0; i < arguments.length - 2; i++) {
		callbacks.push(arguments[i + 2])
	}
	if(type == "browser") {
		await this.browser(name, spinner, callbacks).then(fail => this.data.failed += fail)
	} else {
		await this.node(name, spinner, callbacks);
	}
}
