test(name, type) {
	this.data.tested += 1;
	const spinner = ora(name).start();
	let callbacks = [];
	for (var i = 0; i < arguments.length - 2; i++) {
		callbacks.push(arguments[i + 2])
	}
	type == "browser" ? this.browser(name, spinner, callbacks) : this.node(name, spinner, callbacks);
}
