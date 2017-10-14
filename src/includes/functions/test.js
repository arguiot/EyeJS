test(name, type, ...callbacks) {
	this.data.tested += 1;
	const spinner = ora(name).start();
	if(type == "browser") {
		this.browser(name, spinner, callbacks).then(fail => this.data.failed += fail)
	} else {
		this.node(name, spinner, callbacks);
	}
}
